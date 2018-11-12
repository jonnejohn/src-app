function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function OfficeExport() {
    debugger;

    $("#ToolFrameDiv").toggle();



    if ($("#ToolFrameDiv").css('display') != 'none') {

        setExportOfficeSES();

        setCurrentSlideImage();
    }

}

function getQPRLoginName() {
    try {

        var iframe = document.getElementById('iframeHiddenUserName');
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        //if (iframeDoc.getElementById("_USER") != undefined && iframeDoc.getElementById("_USER") != null) {
        var name = iframeDoc.title;
        if (name != "") {

            var loginname;
            if (name.indexOf('(') >= 0) {
                //loginname = name.match(/\(([^)]+)\)/)[1];
                //----syaa amol modification-------------------
                var matches;
                var txt = name;
                var newTxt = txt.split('(');
                for (var i = 1; i < newTxt.length; i++) {
                    matches = (newTxt[i].split(')')[0]);
                }
                loginname = matches;
                //alert("in if condition: "+loginname);

                //------end syaa amol--------------------------

                //loginname = name.match(/\(([^)]+)\)/)[1];
                // alert("in if condition: "+loginname);
            }
            else {
                loginname = name.split('-')[1];
            }
            loginname = btoa(loginname);
            return loginname;
        }

        else
            window.setTimeout('getQPRLoginName();', 100);
        // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds

        //    }
        //else
        //            window.setTimeout('getQPRLoginName();', 100);




    } catch (e) {

    }
}

function setCurrentSlideImage() {
    try {
		debugger;
        var image_obj_id,modelid;
         var currentURL = document.getElementById("iframeDiagram").contentWindow.location.href;
         config['current_obj_id'] = getParameterByName("OBJECTID", currentURL);
		 modelid = getParameterByName("MODELID", currentURL);
         image_obj_id = config['current_obj_id'];
		 
        $("#div_current_image").css("display", "none");
        $("#div_current_image_loading").css("display", "block");
        document.getElementById("imgCurrentSlide").src = "../" + config['url_initial'] + "/Portal/QPR.Isapi.dll?PGPLUGIN&*27&FMT=p&LAN=en%2c1&MODELID=" + modelid + "&OBJECTID=" + image_obj_id + "&FMT=p&SES=" + config['SES'] + "&VIE="+ config['current_view'] + "&dummy=" + new Date().getTime() + generateUIDNotMoreThan1million();
        console.log(document.getElementById("imgCurrentSlide").src );
        $("#div_current_image").css("display", "block");
        $("#div_current_image_loading").css("display", "none");

    } catch (e) {

    }
}

function setCurrentSlideImageUsingObjectId(objectid,model_id) {
    try {
		debugger;
        var image_obj_id = objectid;
		var modelId;
        if(model_id!=null)
			modelId = model_id;
		else
			modelId =  config['model_id'];
        $("#div_current_image").css("display", "none");
        $("#div_current_image_loading").css("display", "block");
        document.getElementById("imgCurrentSlide").src = "../" + config['url_initial'] + "/Portal/QPR.Isapi.dll?PGPLUGIN&*27&FMT=p&LAN=en%2c1&MODELID=" + modelId + "&OBJECTID=" + image_obj_id + "&FMT=p&SES=" + config['SES'] + "&VIE="+ config['current_view'] + "&dummy=" + new Date().getTime() + generateUIDNotMoreThan1million();
        console.log(document.getElementById("imgCurrentSlide").src );
        $("#div_current_image").css("display", "block");
        $("#div_current_image_loading").css("display", "none");

    } catch (e) {

    }
}

function setExportOfficeSES() {
    try {
        debugger;
        //var img_src = document.getElementById('iframeDiagram').contentWindow.getElementByClassName('RealImage').src;
        var img_src = $("#iframeDiagram").contents().find('#DetailsViewFrame').contents().find('.RealImage')[0].src;
        var SES = getQueryStringValueAndURL("SES", img_src);
        //config['SES'] = SES;
        config['SES'] = this.baseSession().uip;
        //alert(SES);

    } catch (e) {

    }
}

function getHeightWidthOfImage() {
    try {

        //var img_src = document.getElementById('iframeDiagram').contentWindow.getElementByClassName('RealImage').src;
        var height = $("#iframeDiagram").contents().find('#DetailsViewFrame').contents().find('.RealImage')[0].clientHeight;
        var width = $("#iframeDiagram").contents().find('#DetailsViewFrame').contents().find('.RealImage')[0].clientWidth;
        return (height + ',' + width);
        //return (width);
    } catch (e) {

    }
}
function getQueryStringValueAndURL(key, url) {
    return unescape(url.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function callExportServiceCurrentSlide() {
    try {
        debugger;;
        if (typeof window.innerWidth != 'undefined') {
            debugger;
            viewportwidth = window.innerWidth,
                viewportheight = window.innerHeight
        }

        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)

        else if (typeof document.documentElement != 'undefined'
            && typeof document.documentElement.clientWidth !=
            'undefined' && document.documentElement.clientWidth != 0) {
            viewportwidth = document.documentElement.clientWidth,
                viewportheight = document.documentElement.clientHeight
        }

        //Start fetching htmldatas
        var filename = "slidecurrent";
        // Done fetching html data

        var ContainerWidth = encodeURIComponent(viewportwidth);
        var ContainerHeight = encodeURIComponent(viewportheight);
        $("#div_current_image").css("display", "none");
        $("#div_current_image_loading").css("display", "block");

        var currentURL = document.getElementById("iframeDiagram").contentWindow.location.href;
        config['current_obj_id'] = getParameterByName("OBJECTID", currentURL);
        $.ajax({

            type: 'POST',

            //url: 'http://localhost:56324/EnecoOfficeExport/CreatePPT.aspx?FileName=' + filename,
            url: '../../EnecoOfficeExport/PDFConverter.aspx?FileName=' + filename,
            data: {

                'ObjectID': encodeURIComponent(config['current_obj_id']),
                'ModelID': encodeURIComponent(config['model_id']),
                'Url_Initial': encodeURIComponent(config['url_initial']),
                'SES': encodeURIComponent(config["SES"]),
                'ContainerWidth': ContainerWidth,
                'ContainerHeight': ContainerHeight,
                'Is_Current_Image': 'create'
            },
            success: function (data, textStatus, request) {

                document.getElementById("imgCurrentSlide").src = "../../EnecoOfficeExport/CurrentImage/slidecurrent.png?" + new Date().getTime() + generateUIDNotMoreThan1million();

                $("#div_current_image").css("display", "block");
                $("#div_current_image_loading").css("display", "none");

            }
        });

    } catch (e) {

    }
}

//function OfficeExportAddCurrentImage() {
//    debugger;;
//    var current_image_counter = parseInt(config['image_counter']) + 1;
//    config['image_counter'] = current_image_counter;
//    var filename = "movedimg" + current_image_counter;
//    $("#div_gen_images_loading").css("display", "none");
//    $("#div_current_image").css("display", "none");
//    $("#div_current_image_loading").css("display", "block");
//    $("#PowerPoint_Export").prop('disabled', false);
//    var result = $("body").find("#SyaaInformationHeaderLeftDiv").children();
//    if (result[0].textContent.indexOf('-->') >= 0) {
//        result = result[0].textContent.split("-->");
//        result = result[result.length - 1];
//    }
//    else
//        result = result[0].textContent;
//    config['added_images_name'].push(result);

//    $.ajax({
//        type: 'POST',
//        //url: 'http://localhost:64074/EnecoOfficeExport/PDFConverter.aspx?FileName=' + filename,
//        url: '../../EnecoOfficeExport/PDFConverter.aspx?FileName=' + filename,
//        data: {
//            'Is_Current_Image': 'add'
//        },
//        success: function (data, textStatus, request) {
//            debugger;;
//            var added_images = config['added_images'];
//            added_images.push(filename + ".png");
//            generateDynamicSlidesOnAdd(filename);
//            $("#div_current_image").css("display", "block");
//            $("#div_current_image_loading").css("display", "none");
//            $("#div_gen_images_loading").css("display", "none");
//            //window.location = "../../EnecoOfficeExport/ImageGenerator.aspx?FileName=" + filename + ".png";
//            //  window.location = "../../EnecoOfficeExport/ImageGenerator.aspx?FileName=" + filename + ".png";
//        }
//    });
//}



function OfficeExportAddCurrentImage() {
    debugger;
    ///* commented for better quality export

    var current_image_counter = parseInt(config['image_counter']) + 1;
    config['image_counter'] = current_image_counter;
    // var filename = "movedimg_" + "demo" + "_" + current_image_counter;
    var filename = "movedimg_" + getQPRLoginName() + "_" + current_image_counter;
    $("#div_gen_images_loading").css("display", "none");
    $("#div_current_image").css("display", "none");
    $("#div_current_image_loading").css("display", "block");
    $("#PowerPoint_Export").prop('disabled', false);
    var result = $('#breadcrumb')[0].innerText;
    if (result.indexOf('/') >= 0) {
        result = result.split("/");
        result = result[result.length - 1];
    }
    else
        result = result;
    config['added_images_name'].push(result);
    /*  var result = $("body").find("#SyaaInformationHeaderLeftDiv").children();
      if (result[0].textContent.indexOf('-->') >= 0) {
          result = result[0].textContent.split("-->");
          result = result[result.length - 1];
      }
      else
          result = result[0].textContent;
      config['added_images_name'].push(result);*/
    //

    //var browser_height =  document.body.clientHeight;
    //var browser_width = document.body.clientWidth;
    debugger;


    var iframe = $("#iframeDiagram").contents().find('#DetailsViewFrame').contents().find('.RealImage').length;

    if (iframe > 0) {
        checkHeightExist(filename)
    }
    else
        window.setTimeout('OfficeExportAddCurrentImage();', 100);

}


function checkHeightExist(filename) {
    try {
        var height = $("#iframeDiagram").contents().find('#DetailsViewFrame').contents().find('.RealImage')[0].clientHeight;

        var width = $("#iframeDiagram").contents().find('#DetailsViewFrame').contents().find('.RealImage')[0].clientWidth;

        var viewportwidth, viewportheight;
        if (typeof window.innerWidth != 'undefined') {
            debugger;
            viewportwidth = window.innerWidth,
                viewportheight = window.innerHeight
        }

        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)

        else if (typeof document.documentElement != 'undefined'
            && typeof document.documentElement.clientWidth !=
            'undefined' && document.documentElement.clientWidth != 0) {
            viewportwidth = document.documentElement.clientWidth,
                viewportheight = document.documentElement.clientHeight
        }
        var finalheight, finalwidth;

        if (width > viewportwidth || height > viewportheight) {
            finalheight = height;
            finalwidth = width;
        }
        else if (viewportwidth > width) {

            var diffWidth = viewportwidth - width;

            var diffHeightPercent = (diffWidth / width) * 100

            var diffHeight = (diffHeightPercent / 100) * height;

            //if (viewportheight > height) {

            finalheight = height + diffHeight;
            //}
            //else
            //    finalheight = viewportheight - diffHeight;


            finalwidth = viewportwidth;

            //alert(viewportwidth);
            //alert(viewportheight);

            //alert(width);
            //alert(height);

            //alert(finalwidth);
            //alert(finalheight);



            //var xRatio = viewportwidth / width;
            //var yRatio = viewportheight / height;
            //var ratio = Math.min(xRatio, yRatio);
            //var newHeight = Math.floor(width * ratio);
            //var newWidth = Math.floor(height * ratio);

            console.log("viewportwidth " + viewportwidth);
            console.log("viewportwidth " + viewportheight);

            console.log("width " + width);
            console.log("height " + height);

            console.log("finalwidth " + finalwidth);
            console.log("finalheight " + finalheight);


        }
        else if (viewportheight > height) {
            var diffHeight = viewportheight - height;

            var diffHeightPercent = (diffHeight / height) * 100

            var diffWidth = (diffHeightPercent / 100) * width;

            //if (viewportwidth > width) {

            finalwidth = width + diffWidth;
            //}
            //else
            //    finalwidth = viewportwidth - diffWidth;

            finalheight = viewportheight;


            console.log("viewportwidth " + viewportwidth);
            console.log("viewportwidth " + viewportheight);

            console.log("width " + width);
            console.log("height " + height);

            console.log("finalwidth " + finalwidth);
            console.log("finalheight " + finalheight);
        }
        //return;

        var currentURL = document.getElementById("iframeDiagram").contentWindow.location.href;
        config['current_obj_id'] = getParameterByName("OBJECTID", currentURL);
		config['model_id'] = getParameterByName("MODELID", currentURL);
        var objectid = config['current_obj_id'];
        var model_id = config['model_id'];

        (function (objectid, model_id) {
            $.ajax({
                type: 'POST',
                //url: 'http://localhost:56324/EnecoOfficeExport/PDFConverter.aspx?FileName=' + filename,
                //url: '../../EnecoOfficeExport/PDFConverter.aspx?FileName=' + filename,
                url: window.location.protocol + "//" + window.location.host + "/" + 'EnecoOfficeExport/PDFConverter.aspx?FileName=' + filename,
                data: {
                    'Is_Current_Image': 'add',
                    'objectid': encodeURIComponent(objectid),
                    'modelid': encodeURIComponent(model_id),
                    'urlinitial': encodeURIComponent(config['url_initial']),
                    'SES': encodeURIComponent(config['SES']),
                    'width': encodeURIComponent(parseInt(finalwidth)),
                    'height': encodeURIComponent(parseInt(finalheight)),
                    'username': encodeURIComponent(getQPRLoginName()),
                },
                success: function (data, textStatus, request) {

                    var added_images = config['added_images'];
                    added_images.push(filename + ".png");
                    generateDynamicSlidesOnAdd(filename, objectid, model_id);
                    $("#div_current_image").css("display", "block");
                    $("#div_current_image_loading").css("display", "none");
                    $("#div_gen_images_loading").css("display", "none");
                    //window.location = "../../EnecoOfficeExport/ImageGenerator.aspx?FileName=" + filename + ".png";
                    //  window.location = "../../EnecoOfficeExport/ImageGenerator.aspx?FileName=" + filename + ".png";
                }
            });
        }(objectid, model_id));
    } catch (e) {

    }
}


function generateDynamicSlidesOnAdd(filename, objectid, model_id) {
    try {
        debugger;
       config['SES'] = sReadCookie("SES");
	   alert(config['SES']);
        var src = "../" + config['url_initial'] + "/Portal/QPR.Isapi.dll?PGPLUGIN&*27&FMT=p&LAN=en%2c1&MODELID=" + model_id + "&OBJECTID=" + objectid + "&FMT=p&SES=" + config['SES']  + "&VIE="+ config['current_view'] + "&dummy=" + new Date().getTime() + generateUIDNotMoreThan1million();


        var html = '<div id="divAddedImage' + config['image_counter'] + '"x style="width: 100px; height: 83px; position: relative; text-align: center"><img alt="" id="img1" unselectable="on" class="PowerPointPreviewThumbnail" style="display: block; width: 100px; height: 75px; left: 0px;border: 2px solid #F2F2F2;" src=' + src + '><img id="imgDelete' + config['image_counter'] + '" src="images/remove_image_new.png" alt="" unselectable="on" style="margin: 0px; border: 0px; padding: 0px; position: absolute; z-index: 1; cursor: pointer; left: 88px; top: -8px;;height:20px;width:20px" class="removeImage"></div>';

        $("#div_all_gen_images").append(html);
        var remove_image = document.getElementById('imgDelete' + config['image_counter']);
        var image_counter = config['image_counter']

        remove_image.onclick = function () { removeImage(image_counter); };//Assigning an event handler 

    } catch (e) {

    }
}

function removeImage(image_counter) {
    debugger;
    try {
        debugger;;
        //for (var i = image_counter-1; i < config['added_images'].length; i++)
        //{
        //    config['added_images'][i] = config['added_images'][i + 1];
        //}
        //config['added_images'].remove("movedimg" + image_counter+".png");
        var ax;
        if (config['added_images'].length) {
            what = "movedimg_" + getQPRLoginName() + "_" + image_counter + ".png";
            if ((ax = config['added_images'].indexOf(what)) !== -1) {
                config['added_images'].splice(ax, 1);
                config['added_images_name'].splice(ax, 1);
            }
        }
        //for (var i = image_counter - 1; i < config['added_images_name'].length; i++) {
        //    config['added_images_name'][i] = config['added_images_name'][i + 1];
        //}
        $("#divAddedImage" + image_counter).remove();

        //var temp_image_file_name = config['added_images'][image_counter - 1];
        //config['added_images'][image_counter - 1] = config['added_images'][image_counter];
        //config['added_images'][image_counter] = temp_image_file_name;

        //temp_image_file_name = config['added_images_name'][image_counter - 1];
        //config['added_images_name'][image_counter - 1] = config['added_images_name'][image_counter];
        //config['added_images_name'][image_counter] = temp_image_file_name;

    } catch (e) {

    }

}

function createPPT() {

    debugger;
    var image_file_names = "", image_names = "";
    if (config['added_images'] != [] && config['added_images'].length > 0)
        //image_file_names = config['added_images'].join();
        image_file_names = config['added_images'].join('&|');


    if (config['added_images_name'] != [] && config['added_images_name'].length > 0)
        image_names = config['added_images_name'].join('&|');

    //var name = "demo";

    var name = getQPRLoginName();

    (function (name) {
        $.ajax({

            type: 'POST',
            url: '../../EnecoOfficeExport/CreatePPT.aspx',

            //url: 'http://localhost:56324/EnecoOfficeExport/CreatePPT.aspx',
            data: {
                'fileSequence': image_file_names,
                //'fileSequence': "movedimg_cXBy_1.png&|movedimg_cXBy_2.png&|movedimg_cXBy_3.png&|movedimg_cXBy_4.png",
                //'ImageName': "tetsggfd&|szdds&|sddd&|szddddddds",
                'ImageName': image_names,
                'username': encodeURIComponent(name)
            },
            success: function (data, textStatus, request) {

                window.open('../../EnecoOfficeExport/GeneratedPPT/Eneco_' + name + '.pptx', '_blank');
                //window.open('http://localhost:50803/EnecoOfficeExport/CreatePPT.aspx_' + name + '.pptx', '_blank');
            },
            error: function (data) {
            }
        });
    }(name));
}

function DeleteOfficeContent() {
    debugger;
    try {
        console.log("Delete called!");
        var name = getQPRLoginName()
        console.log("name called!" + name);

        $.ajax({
            type: 'POST',

            //url: 'http://localhost:50803/EnecoOfficeExport/CreatePPT.aspx?delete=all',
            url: '../../EnecoOfficeExport/CreatePPT.aspx?delete=all',
            data: {
                'uname': encodeURIComponent(name),
            },
            success: function (data, textStatus, request) {

                $("#div_all_gen_images").html("");
                document.getElementById("imgCurrentSlide").src = "";
                config['added_images'] = [];
                config['added_images_name'] = [];
                config['image_counter'] = 0;
                console.log("dleet done");
                setCurrentSlideImage();
                $("#PowerPoint_Export").prop('disabled', true);
            },
            error: function (data) {
            }
        });
    } catch (e) {

    }
}

function generateUIDNotMoreThan1million() {
    return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
}
//function callExportServiceAddSlide() {
//    try {
//        debugger;;
//        if (typeof window.innerWidth != 'undefined') {
//            debugger;
//            viewportwidth = window.innerWidth,
//            viewportheight = window.innerHeight
//        }
//            // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
//        else if (typeof document.documentElement != 'undefined'
//            && typeof document.documentElement.clientWidth !=
//            'undefined' && document.documentElement.clientWidth != 0) {
//            viewportwidth = document.documentElement.clientWidth,
//            viewportheight = document.documentElement.clientHeight
//        }

//        //Start fetching htmldatas
//        var filename = generateUIDNotMoreThan1million();
//        // Done fetching html data
//        var ContainerWidth = encodeURIComponent(viewportwidth);
//        var ContainerHeight = encodeURIComponent(viewportheight);


//        $.ajax({
//            type: 'POST',
//            // url: 'http://localhost:64074/EnecoOfficeExport/PDFConverter.aspx?FileName=' + filename,
//            url: '../../EnecoOfficeExport/PDFConverter.aspx?FileName=' + filename,
//            data: {
//                'ObjectID': encodeURIComponent(config['current_obj_id']),
//                'ModelID': encodeURIComponent(config['model_id']),
//                'Url_Initial': encodeURIComponent(config['url_initial']),
//                'SES': encodeURIComponent(sessionStorage.getItem("SES")),
//                'ContainerWidth': ContainerWidth,
//                'ContainerHeight': ContainerHeight,
//                'Is_Current_Image': 'add'
//            },
//            success: function (data, textStatus, request) {
//                debugger;;
//            }
//        });

//    } catch (e) {

//    }
//}
Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


function checkiframeHiddenUserNameLoaded() {
    // Get a handle to the iframe element
    iframe = document.getElementById('iframeHiddenUserName');

    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Check if loading is complete
    //if (iframeDoc.readyState == 'complete') {

    //    //iframe.contentWindow.alert("Hello");

    //    iframe.contentWindow.onload = function () {
    //        alert("I am loaded");
    //    };

    //    // The loading is complete, call the function we want executed once the iframe is loaded
    //    afterLoading();
    //    return;
    //}
    //debugger;
    //if (iframeDoc.getElementById("_USER") != undefined && iframeDoc.getElementById("_USER") != null) {
    if (iframeDoc.title != "")
        DeleteOfficeContent();
    else
        window.setTimeout('checkiframeHiddenUserNameLoaded();', 100);
    // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds

    //}
    //else
    //    window.setTimeout('checkiframeHiddenUserNameLoaded();', 100);
}

function sReadCookie(sName, sDefaultValue=""){
  var sResult;
 // var sAllCookies = document.cookie;
var bardocument= document.getElementById('iframeDiagram').contentWindow.document.getElementById('DetailsViewFrame').contentWindow.document; // IE compat
alert(bardocument.cookie);
  var sAllCookies = bardocument.cookie;
  console.log(sAllCookies);
  var iBegin = sAllCookies.indexOf(sName + "=");
  if (iBegin == -1) {
    sResult = sDefaultValue;
  }
  else {
    iBegin = sAllCookies.indexOf("=", iBegin) + 1;
    var iEnd = sAllCookies.indexOf(";", iBegin);

    if (iEnd == -1)
      iEnd = sAllCookies.length;
    
    sResult = decodeURI(sAllCookies.substring(iBegin, iEnd));
  }
  return sResult;
}



