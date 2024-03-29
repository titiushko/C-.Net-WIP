﻿using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Web.Mvc;
using System;
using Titiushko.MVC.Utils.Extensions;
using Titiushko.MVC5.Constants.Names;
using Titiushko.MVC5.Extensions;
using Titiushko.MVC5.Helpers;
using Titiushko.MVC5.Models;
using Titiushko.Utilities.Constants.Errors;
using Titiushko.Utilities.Responses;
using System.Linq;
using Titiushko.Utilities.Extensions;

namespace Titiushko.MVC5.Controllers
{
    [RoutePrefix(ControllerName.STATUS)]
    public class TitiushkoStatusController : BaseController
    {
        private ProjectFollowingEntities db = new ProjectFollowingEntities();

        [HttpGet]
        //[Route("index")]
        public ActionResult Index()
        {
            if (!User.Identity.IsAuthenticated) return RedirectToAuthenticatedDenied();
            ViewBag.BreadcomeArea.Title = string.Format(Resources.Resource.TextListOf, Resources.Resource.ModuleStatusName);
            ViewBag.BreadcomeArea.Level1 = new MvcHtmlString((string)ViewBag.BreadcomeArea.Title);
            return View();
        }

        [HttpGet]
        [Route("get")]
        public JsonResult Get(Models.BootstrapDataTable.Request pDataTableRequest)
        {
            if (!User.Identity.IsAuthenticated) return Json(JsonError.AUTHENTICATED_DENIED, JsonRequestBehavior.AllowGet);
            if (!Request.IsAjaxRequest()) return Json(JsonError.AJAX_DENIED, JsonRequestBehavior.AllowGet);
            try
            {
                IEnumerable<StatusModel> vStatusModelList = db.TitiushkoStatus.ToCustomModelList();

                //Total de todos los registros
                int vTotalRows = vStatusModelList.Count();

                //Buscar si pDataTableRequest.search se encuentra en Name o Description
                if (!string.IsNullOrWhiteSpace(pDataTableRequest.search))
                {
                    pDataTableRequest.search = pDataTableRequest.search.ToLower();
                    vStatusModelList = vStatusModelList.Where(m => m.Name.ToLower().Contains(pDataTableRequest.search) || m.Description.ToLower().Contains(pDataTableRequest.search));
                }

                //Ordenar por pDataTableRequest.order (ascendente o descendente) la columna pDataTableRequest.sort
                Func<StatusModel, string> vOrderingFunction = (m =>
                    pDataTableRequest.sort.Equals("Name") ? m.Name :
                    pDataTableRequest.sort.Equals("Description") ? m.Description :
                    pDataTableRequest.sort.Equals("DateCreated") ? m.DateCreated :
                    pDataTableRequest.sort.Equals("UserCreated") ? m.UserCreated :
                    pDataTableRequest.sort.Equals("DateModified") ? m.DateModified :
                    pDataTableRequest.sort.Equals("UserModified") ? m.UserModified :
                    m.Name /*Ordenamiento predeterminado*/);
                if (pDataTableRequest.order.Equals("asc")) vStatusModelList = vStatusModelList.OrderBy(vOrderingFunction);
                else if (pDataTableRequest.order.Equals("desc")) vStatusModelList = vStatusModelList.OrderByDescending(vOrderingFunction);

                //Obtener paginación desde pDataTableRequest.offset hasta pDataTableRequest.limit
                vStatusModelList = vStatusModelList.Skip(pDataTableRequest.offset).Take(pDataTableRequest.limit);

                return Json(new JsonResponse() { Content = new Models.BootstrapDataTable.Response() { total = vTotalRows, rows = vStatusModelList } }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception vException)
            {
                Logging.Logger.Error(vException);
                return Json(JsonError.EXCEPCION(vException).SetContent(new Models.BootstrapDataTable.Response()), JsonRequestBehavior.AllowGet);
            }
        }

        // GET: TitiushkoStatus/Create
        [HttpGet]
        [Route("create")]
        public ActionResult Create()
        {
            if (!User.Identity.IsAuthenticated) return RedirectToAuthenticatedDenied();
            ViewBag.BreadcomeArea = this.GetHtmlHelper().GetBreadcomeAreaUpToLevel2(ActionName.CREATE, ControllerName.STATUS);
            return PartialView();
        }

        // POST: TitiushkoStatus/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Route("create")]
        [ValidateAntiForgeryToken]
        public JsonResult Create(StatusModel pStatusModel)
        {
            if (!User.Identity.IsAuthenticated) return Json(JsonError.AUTHENTICATED_DENIED);
            if (!Request.IsAjaxRequest()) return Json(JsonError.AJAX_DENIED);
            try
            {
                JsonResponse vJsonResponse = new JsonResponse();
                if (ModelState.IsValid)
                {
                    db.TitiushkoStatus.Add(new TitiushkoStatus()
                    {
                        Name = pStatusModel.Name,
                        Description = pStatusModel.Description,
                        DateCreated = DateTime.Now,
                        UserCreated = User.Identity.Name,
                        DateModified = DateTime.Now,
                        UserModified = User.Identity.Name
                    });
                    db.SaveChanges();
                    vJsonResponse.Message.Add(string.Format(Resources.Resource.TextCreateSuccessFor, Resources.Resource.ModuleStatusName));
                }
                else
                {
                    vJsonResponse.SetErrorMessage(ModelState, string.Format(Resources.Resource.TextCreateErrorFor, Resources.Resource.ModuleStatusName));
                }
                return Json(vJsonResponse);
            }
            catch (DbEntityValidationException vEntityException)
            {
                Logging.Logger.Error(vEntityException);
                return Json(JsonError.EXCEPCION(vEntityException));
            }
            catch (Exception vException)
            {
                Logging.Logger.Error(vException);
                return Json(JsonError.EXCEPCION(vException));
            }
        }

        // GET: TitiushkoStatus/Edit/5
        [HttpGet]
        [Route("edit/{id}")]
        public ActionResult Edit(int? id)
        {
            if (!User.Identity.IsAuthenticated) return RedirectToAuthenticatedDenied();
            try
            {
                if (id == null) return Error400();
                StatusModel vStatusModel = db.TitiushkoStatus.FindAndConvertToCustomModel(id);
                if (vStatusModel == null) return Error404();
                ViewBag.BreadcomeArea = this.GetHtmlHelper().GetBreadcomeAreaUpToLevel2(ActionName.EDIT, ControllerName.STATUS);
                return PartialView(vStatusModel);
            }
            catch (Exception vException)
            {
                Logging.Logger.Error(vException);
                this.SetTempDataException(vException);
                return RedirectToAction(ActionName.INDEX);
            }
        }

        // POST: TitiushkoStatus/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Route("edit")]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(StatusModel pStatusModel)
        {
            if (!User.Identity.IsAuthenticated) return Json(JsonError.AUTHENTICATED_DENIED);
            if (!Request.IsAjaxRequest()) return Json(JsonError.AJAX_DENIED);
            try
            {
                JsonResponse vJsonResponse = new JsonResponse();
                if (ModelState.IsValid)
                {
                    TitiushkoStatus vTitiushkoStatus = db.TitiushkoStatus.Find(pStatusModel.Id);
                    if (vTitiushkoStatus == null) return Error404();
                    vTitiushkoStatus.Name = pStatusModel.Name;
                    vTitiushkoStatus.Description = pStatusModel.Description;
                    vTitiushkoStatus.DateModified = DateTime.Now;
                    vTitiushkoStatus.UserModified = User.Identity.Name;
                    db.SaveChanges();
                    vJsonResponse.Message.Add(string.Format(Resources.Resource.TextEditSuccessFor, Resources.Resource.ModuleStatusName));
                }
                else
                {
                    vJsonResponse.SetErrorMessage(ModelState, string.Format(Resources.Resource.TextEditErrorFor, Resources.Resource.ModuleStatusName));
                }
                return Json(vJsonResponse);
            }
            catch (DbEntityValidationException vEntityException)
            {
                Logging.Logger.Error(vEntityException);
                return Json(JsonError.EXCEPCION(vEntityException));
            }
            catch (Exception vException)
            {
                Logging.Logger.Error(vException);
                return Json(JsonError.EXCEPCION(vException));
            }
        }

        // POST: TitiushkoStatus/Delete/5
        [HttpPost, ActionName("Delete"), Route("delete")]
        [ValidateAntiForgeryToken]
        public JsonResult DeleteConfirmed(int? id)
        {
            if (!User.Identity.IsAuthenticated) return Json(JsonError.AUTHENTICATED_DENIED);
            if (!Request.IsAjaxRequest()) return Json(JsonError.AJAX_DENIED);
            try
            {
                if (id == null) return Json(JsonError.ERROR_400);
                TitiushkoStatus vTitiushkoStatus = db.TitiushkoStatus.Find(id);
                if (vTitiushkoStatus == null) return Json(JsonError.ERROR_404);
                db.TitiushkoStatus.Remove(vTitiushkoStatus);
                db.SaveChanges();
                return Json(new JsonResponse() { Message = new HashSet<string>() { string.Format(Resources.Resource.TextDeleteSuccessFor, Resources.Resource.ModuleStatusName) } });
            }
            catch (DbEntityValidationException vEntityException)
            {
                Logging.Logger.Error(vEntityException);
                return Json(JsonError.EXCEPCION(vEntityException));
            }
            catch (Exception vException)
            {
                Logging.Logger.Error(vException);
                return Json(JsonError.EXCEPCION(vException));
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}