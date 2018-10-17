using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Titiushko.MVC5.Models;

namespace Titiushko.MVC5.Controllers
{
    public class TitiushkoStatusController : Controller
    {
        private ProjectFollowingEntities db = new ProjectFollowingEntities();

        // GET: TitiushkoStatus
        public ActionResult Index()
        {
            return View(db.TitiushkoStatus.ToList());
        }

        // GET: TitiushkoStatus/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TitiushkoStatus titiushkoStatus = db.TitiushkoStatus.Find(id);
            if (titiushkoStatus == null)
            {
                return HttpNotFound();
            }
            return View(titiushkoStatus);
        }

        // GET: TitiushkoStatus/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TitiushkoStatus/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name,Description,DateCreated,UserCreated,DateModified,UserModified")] TitiushkoStatus titiushkoStatus)
        {
            if (ModelState.IsValid)
            {
                db.TitiushkoStatus.Add(titiushkoStatus);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(titiushkoStatus);
        }

        // GET: TitiushkoStatus/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TitiushkoStatus titiushkoStatus = db.TitiushkoStatus.Find(id);
            if (titiushkoStatus == null)
            {
                return HttpNotFound();
            }
            return View(titiushkoStatus);
        }

        // POST: TitiushkoStatus/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,Description,DateCreated,UserCreated,DateModified,UserModified")] TitiushkoStatus titiushkoStatus)
        {
            if (ModelState.IsValid)
            {
                db.Entry(titiushkoStatus).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(titiushkoStatus);
        }

        // GET: TitiushkoStatus/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TitiushkoStatus titiushkoStatus = db.TitiushkoStatus.Find(id);
            if (titiushkoStatus == null)
            {
                return HttpNotFound();
            }
            return View(titiushkoStatus);
        }

        // POST: TitiushkoStatus/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TitiushkoStatus titiushkoStatus = db.TitiushkoStatus.Find(id);
            db.TitiushkoStatus.Remove(titiushkoStatus);
            db.SaveChanges();
            return RedirectToAction("Index");
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
