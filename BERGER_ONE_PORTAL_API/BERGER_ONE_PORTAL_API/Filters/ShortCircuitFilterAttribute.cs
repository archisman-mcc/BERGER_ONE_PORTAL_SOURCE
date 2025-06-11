using Microsoft.AspNetCore.Mvc.Filters;

namespace BERGER_ONE_API.Filters
{
    public class ShortCircuitFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
            // Check if a result is already set by previous filters or action method
            if (context.Result != null)
            {
                return; // Short-circuit further execution
            }
        }
    }
}
