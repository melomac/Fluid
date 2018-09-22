/*

Userscript for Fluid app

Feedbin
URL pattern: https://feedbin.com/

*/

setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 10000);

function updateDockBadge() {
    var title = document.title;
    if (!title.length)
        return;

    var regex = /Feedbin \((\d+)\)/;
    var res = title.match(regex);
    if (!res)
        return;

    var count = parseInt(res[1]);
    // console.log('current count: ' + window.fluid.dockBadge + ', new count: ' + count);

    if (count > 0)
        window.fluid.dockBadge = count;
    else
        window.fluid.dockBadge = '';
}
