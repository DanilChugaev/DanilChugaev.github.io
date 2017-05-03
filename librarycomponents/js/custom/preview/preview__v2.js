(function() {
    var uploadElements  = document.getElementById('upload'),    /*инпут типа файл*/
        previewImg      = document.getElementById('preview-img'),/*тут выводятся превьюшки изображений*/
        previewText     = document.getElementById('preview-text'),/*тут выводятся наименования файлов*/
        formData        = new FormData(),   /*объект формДата для отправки файлов на сервер*/
        form            = document.getElementById('feedback'), /*форма*/
        uploadButton    = document.getElementById('submit-button'), /*кнопка загрузки*/
        xhr             = new XMLHttpRequest(),
        countFiles      = 0,
        reqCountFiles   = 5;    /*требуемое количество загружаемых файлов*/
    /*позже будет внедрена проверка на максимальный объем загружаемых файлов*/

    /*событие загрузки файлов*/
    uploadElements.addEventListener("change", function(e) {
        var arr = [].slice.call(this.files);

        if(arr.length == 0)
            return;

        /*определяем поддержку на forEach*/
        if (arr.forEach) {
            arr.forEach(function (item, i, arr) {
                if( countFiles < reqCountFiles ) {
                    preview(item);

                    var newName = rename(item.name,1);

                    formData.append('file[' + newName + ']', item, newName);
                    countFiles++;
                }
            });
        } else {
            /*данный код для IE*/
            for (var i = 0; i < arr.length; i++) {
                if( countFiles < reqCountFiles ) {
                    preview(item);

                    var newName = rename(item.name,1);

                    debugger;
                    formData.append('file[' + newName + ']', item, newName);
                    countFiles++;
                }
            }
        }

        console.log(formData);

    });

    /*отправка формы*/
    form.onsubmit = function(event) {
        event.preventDefault();

        uploadButton.innerHTML = 'Загружаю...';

        xhr.open('POST', 'handler.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                uploadButton.innerHTML = 'Отправляю...';
            } else {
                uploadButton.innerHTML = 'Ошибка отправки';
            }
        };

        xhr.send(formData);
    };

    /*удаление файлов*/
    deleteFiles = function (obj) {
        var fileName = rename(obj.getAttribute('name'),2);
            img      = previewImg.childNodes;

        /*определяем поддержку на forEach*/
        if (img.forEach) {
            img.forEach(function (item, i, arr) {
                var newName = rename(item.name, 1);

                if (newName == fileName) {
                    createRemove();
                    item.remove();
                }
            });
        } else {
            /*данный код для IE*/
            for (var i = 0; i < img.length; i++) {
                var newName = rename(img[i].name, 1);

                if (newName == fileName) {
                    debugger;
                    createRemove();
                    img[i].remove();
                }
            }
        }

        createRemove();
        obj.parentNode.remove();

        debugger;
        formData.delete('file[' + fileName + ']');
        countFiles = 0;
    };

    /*если у элемента/ов не поддерживается метод remove()*/
    function createRemove(someElement) {
        if (!someElement) {
            if (!Element.prototype.remove) {
                Element.prototype.remove = function remove() {
                    if (this.parentNode) {
                        this.parentNode.removeChild(this);
                    }
                };
            }
        } else {
            if (!someElement.prototype.remove) {
                someElement.prototype.remove = function remove() {
                    if (this.parentNode) {
                        this.parentNode.removeChild(this);
                    }
                };
            }
        }
    }

    /*показ превью и наименования файлов*/
    function preview(file) {
        var newName = rename(file.name,1),
            type, documentImg;

        /*тут также можно сделать проверку на соответствие типу файла*/
        if ( file.type.match(/image.*/) ) {
            var reader = new FileReader(), img;

            reader.addEventListener("load", function(event) {
                img = document.createElement('img');
                img.src = event.target.result;
                img.name = newName;
                previewImg.appendChild(img);
            });

            reader.readAsDataURL(file);
            type = "img";
        }
        else
        if ( type = file.name.match(/\.(?:docx|doc|odt|txt|rtf|pdf|ppt|pptx|xlsx|xls|sxc|accdb|mdb|html|php|xml|zip)$/i) ) {
            type = type[0].toLowerCase().slice(1);
        }

        /*если загружается какой-то документ то выводим превью соответствуюшего типа документа*/
        if ( type ) {
            switch(type) {
                case "docx":
                case "doc":
                case "odt":
                    type = "docx.jpg"; break;
                case "xlsx":
                case "xls":
                    type = "xlsx.jpg"; break;
                case "pptx":
                case "ppt":
                    type = "pptx.jpg"; break;
                case "accdb":
                case "mdb":
                    type = "accdb.jpg"; break;
                case "pdf":
                    type = "pdf.png"; break;
                case "txt":
                    type = "txt.png"; break;
                case "zip":
                    type = "zip.png"; break;
                case "img":
                    type = "img.png"; break;
                default:
                    type = "document.png"; break;
            }

            documentImg = "<img src='image/" + type + "' name='document' alt='" + type + " file'> ";
        } else {
            documentImg = "";
        }

        var li = document.createElement('li');
        li.innerHTML = documentImg + "<span>" + newName + "</span>" + " " + "<button type='button' name='" + newName + "' onclick='deleteFiles(this)'>X</button>";
        previewText.appendChild(li);
    }

    /*замена регулярным выражением кавычек в имени*/
    function rename(name,number) {
        switch(number) {
            case 1:  return name.replace(/'/g, '&#34;'); break;
            case 2:  return name.replace(/"/g, '&#34;'); break;
        }
    }
})();

