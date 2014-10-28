/*

Fluid App URL Handler script

FastMail web interface
URL pattern: mailto:*

*/

function transform(inURLString)
{
	return "https://www.fastmail.com/action/compose/?mailto=" + inURLString;
}
