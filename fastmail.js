/*

Userscript for Fluid app

FastMail web interface
URL pattern: *.fastmail.com/mail/*

*/

setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 10000);

INBOX_ONLY = false;
FILTERED = ['Drafts', 'Trash', 'Spam'];

function updateDockBadge()
{
    var count = 0;

    var tree = document.getElementsByClassName('v-FolderTree')[0];
    if (!tree)
        return;

    for (i = 0;  i < tree.childNodes.length; i++)
    {
        name = tree.childNodes[i].getElementsByClassName('v-FolderSource-name')[0].innerText;
        badge = tree.childNodes[i].getElementsByClassName('v-FolderSource-badge')[0].innerText;
        // console.log('name: ' + name + ', badge: ' + badge);

        if (!badge)
            continue;

        if (INBOX_ONLY && name == 'Inbox')
        {
            count += parseInt(badge);
            break;
        }

        if (FILTERED.indexOf(name) != -1)
        {
            // console.log('filtered: ' + name);
            continue;
        }
        
        count += parseInt(badge);
    }

    // console.log('current count: ' + window.fluid.dockBadge + ', new count: ' + count);
    if (count > 0)
        window.fluid.dockBadge = count;
    else
        window.fluid.dockBadge = '';
}
