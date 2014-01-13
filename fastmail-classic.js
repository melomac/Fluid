/*

Fluid App Userscript

FastMail classic web interface
URL pattern: *fastmail.fm/html/*

*/

setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 10000);

var INBOX_ONLY = false;

function updateDockBadge() {
    var badge = 0;
    var tree = document.getElementsByClassName("folder");
    for (i = 0;  i < tree.length; i++)
    {
        var folder = tree[i].getElementsByClassName("overflow")[0].childNodes[0].data.replace("\u200e","");
        // console.log(folder);
        
        if (! INBOX_ONLY || folder == "Inbox")
        {
            var counts = tree[i].getElementsByClassName("messageCounts")[0].childNodes[0].data;
            // console.log(counts);
            
            if (counts)
            {
                var res = counts.match(/ \((\d+)/);
                
                if (res && res.length > 1)
                {
                    // console.log(folder + ": " + res[1]);
                    badge += parseInt(res[1]);
                }
            }
        }
    }
    
    if (badge)
    {
        window.fluid.dockBadge = badge;
    } else {
        window.fluid.dockBadge = "";
    }
}
