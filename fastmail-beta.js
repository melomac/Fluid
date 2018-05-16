/*

Fluid App Userscript

FastMail web interface
URL pattern: *fastmail.com/mail/*

*/

setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 10000);

INBOX_ONLY = false;
FILTERED = [ "Drafts", "Trash", "Spam" ];

function updateDockBadge()
{
    var count = 0;
    
    var tree = document.getElementsByClassName("v-FolderTree")[0];
    
    if (!tree)
        return;
    
    for (i = 0;  i < tree.childNodes.length; i++)
    {
        name = tree.childNodes[i].getElementsByClassName("v-FolderSource-name")[0].innerText;
        badge = tree.childNodes[i].getElementsByClassName("v-FolderSource-badge")[0].innerText;
        // console.log("name: " + name + ", badge: " + badge);
        
        if (badge)
        {
            if (! INBOX_ONLY || name == "Inbox")
            {
                if (FILTERED.indexOf(name) == -1)
                {
                    count += parseInt(badge);
                } else {
                    // console.log("filtered: " + name);
                }
            }
        }
    }
    
    // console.log("new count: " + count + ", current count: " + window.fluid.dockBadge);
    if (count > window.fluid.dockBadge)
    {
        notification = {
            title: "FastMail",
            description: "You have " + count + " unread message" + ((count > 1) ? "s" : ""),
            priority: 1,
            sticky: false,
            identifier: "fastmail",
            icon: window.fluid.resourcePath + "appl.icns",
            // icon: "https://www.fastmail.com/static/favicons/touch-icon-196x196.png",
        };
        // window.fluid.showGrowlNotification(notification);
        window.fluid.showUserNotification(notification);
        window.fluid.dockBadge = count;
    } else if (count > 0) {
        window.fluid.dockBadge = count;
    } else {
        window.fluid.dockBadge = "";
    }
}
