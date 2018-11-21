﻿using MockUp.Models;
using System.Web.Mvc;

namespace MockUp.Controllers
{
    public class HomeController : Controller
    {
        private const string IDENTIFICACION = "8-310-78";
        private const string CHASIS = "SJNFBA11Z2201603";

        public ActionResult Index()
        {
            return RedirectToAction("login", "eFWLA");
        }

        [Route("eFWLA/error/404")]
        public ActionResult Error404()
        {
            return View("~/Views/Errors/404.cshtml");
        }

        [Route("eFWLA/error/500")]
        public ActionResult Error500()
        {
            return View("~/Views/Errors/404.cshtml");
        }

        [Route("eFWLA/index")]
        public ActionResult Inicio()
        {
            return View();
        }

        [Route("eFWLA/create_contract")]
        public ActionResult CreateContract()
        {
            return View();
        }

        [HttpGet]
        [Route("eFWLA/check_customer")]
        public JsonResult CheckCustomer(string CLegalID, string UserBank)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(CLegalID)) return Json("false", JsonRequestBehavior.AllowGet);
                else if (CLegalID.Equals(IDENTIFICACION)) return Json("<tr id='c85069'><td align='center'>8-310-78</td><td align='center'>HUMBERTO ARNOLDO ARRUE MONTENEGRO</td><td align='center'><select name='CCustomerType[]' id='CCustomerType' class='required'><option value='' selected>Seleccione la parte</option><option value='Fideicomitente'>Fideicomitente</option><option value='Emisor'>Emisor</option><option value='Co-Deudor'>Co-Deudor</option></select></td><td align='center'><a href='./modules/get_customer.php?ajax=true&width=640&height=300&CustID=85069&UserBank=88' rel='prettyPhoto[ajax]'><img src='./images/icons/customers_preview_small.png' border='0'/></a></td><td align='center'><a href='javascript:;'><img src='./images/icons/remove_icon.png' id='remCust' onClick='removeCustomer(85069)' border='0'/></a><input type='hidden' id='CustID[]' name='CustID[]' value='85069'></td></tr>", JsonRequestBehavior.AllowGet);
                else return Json("false", JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json("false", JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [Route("eFWLA/admin_add_customer")]
        public JsonResult AdminAddCustomer(Customer pCustomer)
        {
            try
            {
                return Json("<tr id='c143452'><td align='center'>" + pCustomer.CLegalID + "</td><td align='center'>" + pCustomer.CLegalName + "</td><td align='center'><select name='CCustomerType[]' id='CCustomerType' class='required'><option value='' selected>Seleccione la parte</option><option value='Fideicomitente'>Fideicomitente</option><option value='Emisor'>Emisor</option><option value='Co-Deudor'>Co-Deudor</option></select><td align='center'><a href='./modules/get_customer.php?ajax=true&width=80%&height=80%&CustID=143452' rel='prettyPhoto[ajax]'><img src='./images/icons/customers_preview_small.png' border='0'/></a></td><td align='center'><a href='javascript:;'><img src='./images/icons/remove_icon.png' id='remCust' onClick='removeCustomer(143452)' border='0'/></a><input type='hidden' id='CustID[]' name='CustID[]' value='143452'></td></tr>", JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json("false", JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        [Route("eFWLA/check_moveable_vin")]
        public JsonResult CheckMoveableVin(string MaVin, string BankID)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(MaVin)) return Json(new { result = "true", response = "Favor llenar los datos del bien." }, JsonRequestBehavior.AllowGet);
                else if (MaVin.Equals(CHASIS)) return Json(new { result = "found", response = "<tr id='m162874'><td align='center'></td><td align='center'>NISSAN</td><td align='center'>QASQHAI</td><td align='center'>2018</td><td align='center'><a href='./modules/get_moveable.php?ajax=true&width=80%&height=80%&MaID=162874&UserBank=88' rel='prettyPhoto'><img src='./images/icons/good_preview_small.png' border='0'/></a></td><td align='center'><a href='javascript:;'><img src='./images/icons/remove_icon.png' id='remCust' onClick='removeCar(162874)' border='0'/></a><input type='hidden' id='AssetID[]' name='AssetID[]' value='162874'></td></tr>" }, JsonRequestBehavior.AllowGet);
                else return Json(new { result = "true", response = "Favor llenar los datos del bien." }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { result = "true", response = "Favor llenar los datos del bien." }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [Route("eFWLA/admin_add_moveable")]
        public JsonResult AdminAddMoveable(Moveable pMoveable)
        {
            try
            {
                return Json("<tr id='m169194'><td align='center'></td><td align='center'>" + pMoveable.MaBrand + "</td><td align='center'>" + pMoveable.MaModel + "</td><td align='center'>" + pMoveable.MaYear + "</td><td align='center'><a href='./modules/get_moveable.php?ajax=true&width=640&height=70%&MaID=169194' rel='prettyPhoto[car]'><img src='./images/icons/good_preview_small.png' border='0'/></a></td><td align='center'><a href='javascript:;'><img src='./images/icons/remove_icon.png' id='remCust' onClick='removeCar(169194)' border='0'/></a><input type='hidden' id='AssetID[]' name='AssetID[]' value='169194'></td></tr>", JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json("false", JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [Route("eFWLA/admin_create_contract")]
        public ActionResult AdminCreateContract(string MaVin, string BankID)
        {
            ViewBag.CDateStart = Request["CDateStart"];
            ViewBag.CDateEnd = Request["CDateEnd"];
            ViewBag.CPayStart = Request["CPayStart"];
            ViewBag.CDisbursementDate = Request["CDisbursementDate"];
            return PartialView();
        }
    }
}