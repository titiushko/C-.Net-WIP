using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Titiushko.MVC5.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using log4net;
using Titiushko.Utilities.Extensions;
using Titiushko.MVC.Utils.Extensions;
using System.Collections.Generic;

namespace Titiushko.MVC5.Controllers
{
    [Authorize]
    public class AccountController : BaseController
    {
        private ProjectFollowingEntities db = new ProjectFollowingEntities();
        private ApplicationDbContext _db = new ApplicationDbContext();
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController()
        {
            logger = LogManager.GetLogger("AccountController");
        }

        public AccountController(ApplicationUserManager pUserManager, ApplicationSignInManager pSignInManager)
        {
            UserManager = pUserManager;
            SignInManager = pSignInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid) return View(model);
            try
            {
                ApplicationUser vApplicationUser = UserManager.Users.Where(m => m.UserName.Equals(model.Email)).SingleOrDefault();
                if (vApplicationUser == null) vApplicationUser = UserManager.Users.Where(m => m.Email.Equals(model.Email)).SingleOrDefault();
                if (vApplicationUser != null)
                {
                    if (vApplicationUser.LockoutEnabled) return RedirectToAction("Lockout", new { returnUrl = returnUrl });
                }
                else
                {
                    this.SetTempDataError("Intento de inicio de sesión no válido.");
                    return View(model);
                }
                //TODO: Descomnetar en caso de que se utilice. Validar usuario de dominio.
                //if (Membership.ValidateUser(model.Email, model.Password))
                //{
                //MembershipUser vMembershipUser = Membership.GetUser(model.Email);
                SignInStatus vSignInStatus = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
                switch (vSignInStatus)
                {
                    case SignInStatus.Success:
                        return RedirectToLocal(returnUrl);
                    case SignInStatus.LockedOut:
                        return RedirectToAction("Lockout", new { returnUrl = returnUrl });
                    case SignInStatus.RequiresVerification:
                        return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
                    case SignInStatus.Failure:
                    default:
                        this.SetTempDataError("Usuario o contraseña inválidos.");
                        return View(model);
                }
                //}
                //else
                //{
                //ModelState.AddModelError(string.Empty, "El usuario no pertenece al dominio.");
                //return View(model);
                //}
            }
            catch (Exception vException)
            {
                logger.Error(vException);
                ModelState.AddModelError(string.Empty, Titiushko.Utilities.Constants.Errors.BaseError.DEFAULT(vException.GetExceptionMessage()));
                return View();
            }
        }

        //
        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        {
            // Require that the user has already logged in via username/password or external login
            if (!await SignInManager.HasBeenVerifiedAsync()) return View("Error");
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid) return View(model);
            // The following code protects for brute force attacks against the two factor codes. 
            // If a user enters incorrect codes for a specified amount of time then the user account 
            // will be locked out for a specified amount of time. 
            // You can configure the account lockout settings in IdentityConfig
            SignInStatus vSignInStatus = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent: model.RememberMe, rememberBrowser: model.RememberBrowser);
            switch (vSignInStatus)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(model.ReturnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid code.");
                    return View(model);
            }
        }

        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser vApplicationUser = new ApplicationUser { UserName = model.Email, Email = model.Email };
                IdentityResult vIdentityResult = await UserManager.CreateAsync(vApplicationUser, model.Password);
                if (vIdentityResult.Succeeded)
                {
                    await SignInManager.SignInAsync(vApplicationUser, isPersistent: false, rememberBrowser: false);
                    // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                    // Send an email with this link
                    //string vCode = await UserManager.GenerateEmailConfirmationTokenAsync(vApplicationUser.Id);
                    //string vCallbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = vApplicationUser.Id, code = vCode }, protocol: Request.Url.Scheme);
                    //await UserManager.SendEmailAsync(vApplicationUser.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + vCallbackUrl + "\">here</a>");
                    return RedirectToAction("Index", "Home");
                }
                AddErrors(vIdentityResult);
            }
            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(code)) return View("Error");
            IdentityResult vIdentityResult = await UserManager.ConfirmEmailAsync(userId, code);
            return View(vIdentityResult.Succeeded ? "ConfirmEmail" : "Error");
        }

        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser vApplicationUser = await UserManager.FindByNameAsync(model.Email);
                // Don't reveal that the user does not exist or is not confirmed
                if (vApplicationUser == null || !(await UserManager.IsEmailConfirmedAsync(vApplicationUser.Id))) return View("ForgotPasswordConfirmation");
                // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                // Send an email with this link
                //string vCode = await UserManager.GeneratePasswordResetTokenAsync(vApplicationUser.Id);
                //string vCallbackUrl = Url.Action("ResetPassword", "Account", new { userId = vApplicationUser.Id, code = vCode }, protocol: Request.Url.Scheme);		
                //await UserManager.SendEmailAsync(vApplicationUser.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + vCallbackUrl + "\">here</a>");
                return RedirectToAction("ForgotPasswordConfirmation", "Account");
            }
            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ForgotPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return string.IsNullOrWhiteSpace(code) ? View("Error") : View();
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid) return View(model);
            ApplicationUser vApplicationUser = await UserManager.FindByNameAsync(model.Email);
            // Don't reveal that the user does not exist
            if (vApplicationUser == null) return RedirectToAction("ResetPasswordConfirmation", "Account");
            IdentityResult vIdentityResult = await UserManager.ResetPasswordAsync(vApplicationUser.Id, model.Code, model.Password);
            if (vIdentityResult.Succeeded) return RedirectToAction("ResetPasswordConfirmation", "Account");
            AddErrors(vIdentityResult);
            return View();
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        {
            string vUserId = await SignInManager.GetVerifiedUserIdAsync();
            if (string.IsNullOrWhiteSpace(vUserId)) return View("Error");
            IList<string> vUserFactors = await UserManager.GetValidTwoFactorProvidersAsync(vUserId);
            List<SelectListItem> vFactorOptions = vUserFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = vFactorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid) return View();
            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider)) return View("Error");
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            ExternalLoginInfo vExternalLoginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (vExternalLoginInfo == null) return RedirectToAction("Login");
            // Sign in the user with this external login provider if the user already has a login
            SignInStatus vSignInStatus = await SignInManager.ExternalSignInAsync(vExternalLoginInfo, isPersistent: false);
            switch (vSignInStatus)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    // If the user does not have an account, then prompt the user to create an account
                    ViewBag.ReturnUrl = returnUrl;
                    ViewBag.LoginProvider = vExternalLoginInfo.Login.LoginProvider;
                    return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { Email = vExternalLoginInfo.Email });
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated) return RedirectToAction("Index", "Manage");
            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                ExternalLoginInfo vExternalLoginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (vExternalLoginInfo == null) return View("ExternalLoginFailure");
                ApplicationUser vApplicationUser = new ApplicationUser { UserName = model.Email, Email = model.Email };
                IdentityResult vIdentityResult = await UserManager.CreateAsync(vApplicationUser);
                if (vIdentityResult.Succeeded)
                {
                    vIdentityResult = await UserManager.AddLoginAsync(vApplicationUser.Id, vExternalLoginInfo.Login);
                    if (vIdentityResult.Succeeded)
                    {
                        await SignInManager.SignInAsync(vApplicationUser, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(vIdentityResult);
            }
            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("Index", "Home");
        }

        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        #region create default users
        [HttpGet]
        [AllowAnonymous]
        public ActionResult CreateRoles()
        {
            try
            {
                RoleManager<IdentityRole> vRoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(_db));
                foreach (string role in Titiushko.MVC5.Constants.Users.Role.ROLES)
                {
                    vRoleManager.Create(new IdentityRole(role));
                }
                this.SetTempDataSuccess("Roles are created correctly.");
                return RedirectToAction("createdefaultusers", "account");
            }
            catch (Exception vException)
            {
                logger.Error(vException);
                this.SetTempDataException(vException);
                return RedirectToAction("index", "home");
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult CreateDefaultUsers()
        {
            try
            {
                UserManager<ApplicationUser> vUserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(_db));
                foreach (string role in Titiushko.MVC5.Constants.Users.Role.ROLES)
                {
                    ApplicationUser user = new ApplicationUser()
                    {
                        UserName = role.ToSlug("."),
                        Email = string.Format("{0}@system.com", role.ToSlug(".")),
                        FirstName = role,
                        LastName = role,
                        CreateDate = DateTime.Now,
                        LastLoginDate = DateTime.Now,
                        LastPasswordChangedDate = DateTime.Now
                    };
                    vUserManager.Create(user, "Admin$1234");
                    vUserManager.AddToRole(user.Id, role);
                }
                this.SetTempDataSuccess("Default users are created correctly.");
                return RedirectToAction("index", "home");
            }
            catch (Exception vException)
            {
                logger.Error(vException);
                this.SetTempDataException(vException);
                return RedirectToAction("index", "home");
            }
        }
        #endregion

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }
                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }
            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri) : this(provider, redirectUri, null) { }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                AuthenticationProperties vAuthenticationProperties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (!string.IsNullOrWhiteSpace(UserId))
                {
                    vAuthenticationProperties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(vAuthenticationProperties, LoginProvider);
            }
        }
        #endregion
    }
}