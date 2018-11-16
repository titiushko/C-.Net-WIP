using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using Titiushko.MVC5.Models;
using Titiushko.MVC5.Constants.Names;
using Titiushko.MVC5.Extensions;
using Titiushko.MVC5.Helpers;
using Titiushko.MVC.Utils.Extensions;

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
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            StatusModel vStatusModel = db.TitiushkoStatus.FindAndConvertToCustomModel(id);
            if (vStatusModel == null)
            {
                return HttpNotFound();
            }
            ViewBag.BreadcomeArea = ControllerHelper.GetBreadcomeAreaUpToLevel2(this.GetHtmlHelper(), ActionName.DETAILS, ControllerName.STATUS);
            return View(vStatusModel);
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
            if (ModelState.IsValid)
            {
                db.TitiushkoStatus.Add(new TitiushkoStatus()
                {
                    Name = pStatusModel.Name,
                    Description = pStatusModel.Description,
                    DateCreated = System.DateTime.Now,
                    UserCreated = User.Identity.Name,
                    DateModified = System.DateTime.Now,
                    UserModified = User.Identity.Name
                });
                db.SaveChanges();
                return RedirectToAction(ActionName.INDEX);
            }
            return View(pStatusModel);
        }

        // GET: TitiushkoStatus/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            StatusModel vStatusModel = db.TitiushkoStatus.FindAndConvertToCustomModel(id);
            if (vStatusModel == null)
            {
                return HttpNotFound();
            }
            ViewBag.BreadcomeArea = ControllerHelper.GetBreadcomeAreaUpToLevel2(this.GetHtmlHelper(), ActionName.EDIT, ControllerName.STATUS);
            return View(vStatusModel);
        }

        // POST: TitiushkoStatus/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(StatusModel pStatusModel)
        {
            if (ModelState.IsValid)
            {
                TitiushkoStatus vTitiushkoStatus = db.TitiushkoStatus.Find(pStatusModel.Id);
                if (vTitiushkoStatus == null)
                {
                    return HttpNotFound();
                }
                vTitiushkoStatus.Name = pStatusModel.Name;
                vTitiushkoStatus.Description = pStatusModel.Description;
                vTitiushkoStatus.DateModified = System.DateTime.Now;
                vTitiushkoStatus.UserModified = User.Identity.Name;
                db.SaveChanges();
                return RedirectToAction(ActionName.INDEX);
            }
            return View(pStatusModel);
        }

        // GET: TitiushkoStatus/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TitiushkoStatus vTitiushkoStatus = db.TitiushkoStatus.Find(id);
            if (vTitiushkoStatus == null)
            {
                return HttpNotFound();
            }
            ViewBag.BreadcomeArea = ControllerHelper.GetBreadcomeAreaUpToLevel2(this.GetHtmlHelper(), ActionName.DELETE, ControllerName.STATUS);
            return View(vTitiushkoStatus);
        }

        // POST: TitiushkoStatus/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TitiushkoStatus vTitiushkoStatus = db.TitiushkoStatus.Find(id);
            db.TitiushkoStatus.Remove(vTitiushkoStatus);
            db.SaveChanges();
            return RedirectToAction(ActionName.INDEX);
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