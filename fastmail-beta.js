/*

Fluid App Userscript

FastMail beta web interface
URL pattern: *fastmail.fm/mail/*

*/

window.fluid.dockBadge = "";
setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 10000);

INBOX_ONLY = false;
FILTERED = [ "Drafts", "Trash", "Spam" ];

function updateDockBadge() {
    var count = 0;
    
    var tree = document.getElementsByClassName("FolderTree")[0];
    for (i = 0;  i < tree.childNodes.length; i++)
    {
        name = tree.childNodes[i].getElementsByClassName("name")[0].innerText;
        badge = tree.childNodes[i].getElementsByClassName("badge")[0].innerText;
        // console.log("name: " + name + ", badge: " + badge);
        
        if (badge)
        {
            if (! INBOX_ONLY || name == "Inbox")
            {
                if (FILTERED.indexOf(name) == -1)
                {
                    count += parseInt(badge);
                } else {
                    // console.log("filtered: " + name)
                }
            }
        }
    }
    
    // console.log("count: " + count);
    if (count != 0) {
        window.fluid.dockBadge = count;
    } else {
        window.fluid.dockBadge = "";
    }
}
