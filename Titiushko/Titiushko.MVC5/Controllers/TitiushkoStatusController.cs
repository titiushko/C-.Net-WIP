using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc.Html;
using System.Web.Mvc;
using Titiushko.MVC5.Models;
using Titiushko.MVC5.Models.Constants.Names;
using Titiushko.MVC5.Extensions;

namespace Titiushko.MVC5.Controllers
{
    [RoutePrefix(Module.STATUS)]
    public class TitiushkoStatusController : BaseController
    {
        private ProjectFollowingEntities db = new ProjectFollowingEntities();

        public ActionResult Index()
        {
            ViewBag.BreadcomeArea.Title = string.Format(Resources.Resource.TextListOf, Resources.Resource.ModuleStatusName);
            ViewBag.BreadcomeArea.Level1 = new MvcHtmlString((string)ViewBag.BreadcomeArea.Title);
            return View(db.TitiushkoStatus.ToList());
        }

        // GET: TitiushkoStatus/Details/5
        public ActionResult Details(int? id)
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
            return View(vTitiushkoStatus);
        }

        // GET: TitiushkoStatus/Create
        public ActionResult Create()
        {
            ViewBag.BreadcomeArea.Title = string.Format(Resources.Resource.TextCreateNewFor, Resources.Resource.ModuleStatusName);
            ViewBag.BreadcomeArea.Level1 = this.GetHtmlHelper().ActionLink(string.Format(Resources.Resource.TextListOf, Resources.Resource.ModuleStatusName), Action.INDEX, Module.STATUS);
            ViewBag.BreadcomeArea.Level2 = new MvcHtmlString((string)ViewBag.BreadcomeArea.Title);
            return View();
        }

        // POST: TitiushkoStatus/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(StatusModel vTitiushkoStatus)
        {
            if (ModelState.IsValid)
            {
                db.TitiushkoStatus.Add(new TitiushkoStatus()
                {
                    Name = vTitiushkoStatus.Name,
                    Description = vTitiushkoStatus.Description,
                    DateCreated = System.DateTime.Now,
                    UserCreated = User.Identity.Name,
                    DateModified = System.DateTime.Now,
                    UserModified = User.Identity.Name
                });
                db.SaveChanges();
                return RedirectToAction(Action.INDEX);
            }

            return View(vTitiushkoStatus);
        }

        // GET: TitiushkoStatus/Edit/5
        public ActionResult Edit(int? id)
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
            return View(vTitiushkoStatus);
        }

        // POST: TitiushkoStatus/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,Description,DateCreated,UserCreated,DateModified,UserModified")] TitiushkoStatus vTitiushkoStatus)
        {
            if (ModelState.IsValid)
            {
                db.Entry(vTitiushkoStatus).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction(Action.INDEX);
            }
            return View(vTitiushkoStatus);
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
            return RedirectToAction(Action.INDEX);
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