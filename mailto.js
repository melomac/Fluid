/*

Fluid App URL Handler script

FastMail web interface
URL pattern: mailto:*

*/

function transform(inURLString)
{
	return "https://www.fastmail.fm/action/compose/?mailto=" + inURLString;
}
