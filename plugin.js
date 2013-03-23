
(function() {
    CKEDITOR.plugins.add('fastimage', {
        lang: 'en',
        requires: 'dialog',
        icons: 'fastimage',
        draw: function(ev) {
            alert('test');
            var ctx = document.getElementById('canvas').getContext('2d'),
                    img = new Image(),
                    f = document.getElementById("uploadimage").files[0],
                    url = window.URL || window.webkitURL,
                    src = url.createObjectURL(f);

            img.src = src;
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
                url.revokeObjectURL(src);
            };
        },
        init: function(editor) {
            CKEDITOR.dialog.add('fastimage', function() {
                return {
                    title: 'Upload a new image',
                    minWidth: 400,
                    minHeight: 400,
                    contents: [
                        {
                            id: 'tab-basic',
                            label: 'Basic Settings',
                            elements: [
                                {
                                    type: 'html',
                                    html: "<div><input type='file' name='img' size='65' id='uploadimage' onchange='CKEDITOR.getshop.fastimage.draw(this)' value='test'></div>" +
                                            '<canvas id="canvas" width="400" height="400"></canvas>'
                                }
                            ]
                        }
                    ],
                    onShow: function(event) {
                    },
                    onOk: function(event) {
                       var img = CKEDITOR.dom.element.createFromHtml('<img src="'+CKEDITOR.getshop.fastimage.data+'">');
                       editor.insertElement(img);
                    }
                };
            });
            editor.addCommand('uploadimage', new CKEDITOR.dialogCommand('fastimage', {
            }));
            editor.ui.addButton('fastimage', {
                label: 'Upload image',
                command: 'uploadimage',
                toolbar: 'fastimage'
            });
        }
    });

})();
CKEDITOR.getshop={};
CKEDITOR.getshop.fastimage = {
    data : null,
    draw: function(element) {
        var ctx = document.getElementById('canvas').getContext('2d'),
                img = new Image(),
                f = element.files[0],
                url = window.URL || window.webkitURL,
                src = url.createObjectURL(f);
        var canvasCopy = document.createElement("canvas");
        var copyContext = canvasCopy.getContext("2d");

        img.src = src;
        img.onload = function() {
            var maxWidth = 1000;
            var maxHeight = 1000;

            var ratio = 1;

            if (img.width > maxWidth)
                ratio = maxWidth / img.width;
            else if (img.height > maxHeight)
                ratio = maxHeight / img.height;

            canvasCopy.width = img.width;
            canvasCopy.height = img.height;
            copyContext.drawImage(img, 0, 0);

            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            ctx.clearRect(0, 0, maxWidth, maxWidth);
            ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
            CKEDITOR.getshop.fastimage.data = canvas.toDataURL('image/png');
            url.revokeObjectURL(src);
        };
    }
};

CKEDITOR.config.image_removeLinkByEmptyURL = true;
