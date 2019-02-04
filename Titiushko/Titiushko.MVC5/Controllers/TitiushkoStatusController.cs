using System.Collections.Generic;
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

namespace Titiushko.MVC5.Controllers
{
    [RoutePrefix(ControllerName.STATUS)]
    public class TitiushkoStatusController : BaseController
    {
        private ProjectFollowingEntities db = new ProjectFollowingEntities();

        public ActionResult Index()
        {
            ViewBag.BreadcomeArea.Title = string.Format(Resources.Resource.TextListOf, Resources.Resource.ModuleStatusName);
            ViewBag.BreadcomeArea.Level1 = new MvcHtmlString((string)ViewBag.BreadcomeArea.Title);
            return View(db.TitiushkoStatus.ToCustomModelList());
        }

        // GET: TitiushkoStatus/Details/5
        public ActionResult Details(int? id)
        {
            try
            {
                if (id == null) return Error400();
                StatusModel vStatusModel = db.TitiushkoStatus.FindAndConvertToCustomModel(id);
                if (vStatusModel == null) return Error404();
                ViewBag.BreadcomeArea = this.GetHtmlHelper().GetBreadcomeAreaUpToLevel2(ActionName.DETAILS, ControllerName.STATUS);
                return View(vStatusModel);
            }
            catch (Exception vException)
            {
                this.SetTempDataException(vException);
                return RedirectToAction(ActionName.INDEX);
            }
        }

        // GET: TitiushkoStatus/Create
        public ActionResult Create()
        {
            ViewBag.BreadcomeArea = this.GetHtmlHelper().GetBreadcomeAreaUpToLevel2(ActionName.CREATE, ControllerName.STATUS);
            return View();
        }

        // POST: TitiushkoStatus/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(StatusModel pStatusModel)
        {
            try
            {
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
                    this.SetTempDataSuccess(string.Format(Resources.Resource.TextCreateSuccessFor, Resources.Resource.ModuleStatusName));
                    return RedirectToAction(ActionName.INDEX);
                }
                else
                {
                    this.SetTempDataError(string.Format(Resources.Resource.TextCreateErrorFor, Resources.Resource.ModuleStatusName));
                }
            }
            catch (DbEntityValidationException vEntityException)
            {
                this.SetTempDataEntityException(vEntityException);
            }
            catch (Exception vException)
            {
                this.SetTempDataException(vException);
            }
            return View(pStatusModel);
        }

        // GET: TitiushkoStatus/Edit/5
        public ActionResult Edit(int? id)
        {
            try
            {
                if (id == null) return Error400();
                StatusModel vStatusModel = db.TitiushkoStatus.FindAndConvertToCustomModel(id);
                if (vStatusModel == null) return Error404();
                ViewBag.BreadcomeArea = this.GetHtmlHelper().GetBreadcomeAreaUpToLevel2(ActionName.EDIT, ControllerName.STATUS);
                return View(vStatusModel);
            }
            catch (Exception vException)
            {
                this.SetTempDataException(vException);
                return RedirectToAction(ActionName.INDEX);
            }
        }

        // POST: TitiushkoStatus/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(StatusModel pStatusModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    TitiushkoStatus vTitiushkoStatus = db.TitiushkoStatus.Find(pStatusModel.Id);
                    if (vTitiushkoStatus == null) return Error404();
                    vTitiushkoStatus.Name = pStatusModel.Name;
                    vTitiushkoStatus.Description = pStatusModel.Description;
                    vTitiushkoStatus.DateModified = DateTime.Now;
                    vTitiushkoStatus.UserModified = User.Identity.Name;
                    db.SaveChanges();
                    this.SetTempDataSuccess(string.Format(Resources.Resource.TextEditSuccessFor, Resources.Resource.ModuleStatusName));
                    return RedirectToAction(ActionName.INDEX);
                }
                else
                {
                    this.SetTempDataError(string.Format(Resources.Resource.TextEditErrorFor, Resources.Resource.ModuleStatusName));
                }
            }
            catch (DbEntityValidationException vEntityException)
            {
                this.SetTempDataEntityException(vEntityException);
            }
            catch (Exception vException)
            {
                this.SetTempDataException(vException);
            }
            return View(pStatusModel);
        }

        // GET: TitiushkoStatus/Delete/5
        public ActionResult Delete(int? id)
        {
            try
            {
                if (id == null) return Error400();
                TitiushkoStatus vTitiushkoStatus = db.TitiushkoStatus.Find(id);
                if (vTitiushkoStatus == null) return Error404();
                ViewBag.BreadcomeArea = this.GetHtmlHelper().GetBreadcomeAreaUpToLevel2(ActionName.DELETE, ControllerName.STATUS);
                return View(vTitiushkoStatus);
            }
            catch (Exception vException)
            {
                this.SetTempDataException(vException);
                return RedirectToAction(ActionName.INDEX);
            }
        }

        // POST: TitiushkoStatus/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public JsonResult DeleteConfirmed(int? id)
        {
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
                return Json(JsonError.EXCEPCION(vEntityException));
            }
            catch (Exception vException)
            {
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