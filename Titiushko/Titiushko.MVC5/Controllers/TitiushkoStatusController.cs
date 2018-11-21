using System.Web.Mvc;
using Titiushko.MVC5.Models;
using Titiushko.MVC5.Constants.Names;
using Titiushko.MVC5.Extensions;
using Titiushko.MVC5.Helpers;
using Titiushko.MVC.Utils.Extensions;
using System;
using System.Data.Entity.Validation;

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
                ViewBag.BreadcomeArea = ControllerHelper.GetBreadcomeAreaUpToLevel2(this.GetHtmlHelper(), ActionName.DETAILS, ControllerName.STATUS);
                return View(vStatusModel);
            }
            catch (Exception vException)
            {
                TempData = vException.TempDataExceptionMessage();
                return RedirectToAction(ActionName.INDEX);
            }
        }

        // GET: TitiushkoStatus/Create
        public ActionResult Create()
        {
            ViewBag.BreadcomeArea = ControllerHelper.GetBreadcomeAreaUpToLevel2(this.GetHtmlHelper(), ActionName.CREATE, ControllerName.STATUS);
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
                    return RedirectToAction(ActionName.INDEX);
                }
            }
            catch (DbEntityValidationException vEntityException)
            {
                TempData = vEntityException.TempDataEntityExceptionMessage();
            }
            catch (Exception vException)
            {
                TempData = vException.TempDataExceptionMessage();
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
                ViewBag.BreadcomeArea = ControllerHelper.GetBreadcomeAreaUpToLevel2(this.GetHtmlHelper(), ActionName.EDIT, ControllerName.STATUS);
                return View(vStatusModel);
            }
            catch (Exception vException)
            {
                TempData = vException.TempDataExceptionMessage();
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
                    return RedirectToAction(ActionName.INDEX);
                }
            }
            catch (DbEntityValidationException vEntityException)
            {
                TempData = vEntityException.TempDataEntityExceptionMessage();
            }
            catch (Exception vException)
            {
                TempData = vException.TempDataExceptionMessage();
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
                ViewBag.BreadcomeArea = ControllerHelper.GetBreadcomeAreaUpToLevel2(this.GetHtmlHelper(), ActionName.DELETE, ControllerName.STATUS);
                return View(vTitiushkoStatus);
            }
            catch (Exception vException)
            {
                TempData = vException.TempDataExceptionMessage();
                return RedirectToAction(ActionName.INDEX);
            }
        }

        // POST: TitiushkoStatus/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int? id)
        {
            try
            {
                if (id == null) return Error400();
                TitiushkoStatus vTitiushkoStatus = db.TitiushkoStatus.Find(id);
                if (vTitiushkoStatus == null) return Error404();
                db.TitiushkoStatus.Remove(vTitiushkoStatus);
                db.SaveChanges();
                return RedirectToAction(ActionName.INDEX);
            }
            catch (DbEntityValidationException vEntityException)
            {
                TempData = vEntityException.TempDataEntityExceptionMessage();
                return RedirectToAction(ActionName.DELETE, new { id = id });
            }
            catch (Exception vException)
            {
                TempData = vException.TempDataExceptionMessage();
                return RedirectToAction(ActionName.DELETE, new { id = id });
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