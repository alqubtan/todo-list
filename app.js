const controller = (function() {

    var Item = function(id, content) {
        this.id = id,
        this.content = content
    }
    var allItems = [];

    return {
        addItem: function(content) {
            var item, id;
            if(allItems.length > 0) {
                id = allItems[allItems.length - 1].id + 1;
            } else {
                id = 0;
            }
            // create new item
            item = new Item(id, content);
            // add item to ds
            allItems.push(item)
            return item;
        },
        deleteItem: function(id) {
            allItems.splice(id, 1);
        },
        test: function() {
            console.log(allItems)
        }
    }

})()

const UIcontroller = (function() {
    
    return {
        displayItem: function(obj) {
            var html;
            html = `<li id="item-${obj.id}"><button class="check-btn" title="mark as completed">
            <i class="fa fa-check-square"></i></button>
             <p>${obj.content}</p>
             <button class="delete-btn" title="delete"><i class="fa fa-trash"></i>
             </button></li>`;

             document.querySelector('.list').insertAdjacentHTML("beforeend", html)
        },
        clearInput: function() {
            document.querySelector('.item-cnt').value = '';
        }, 
        deleteItem: function(id) {
            var item = document.getElementById(id);
            item.parentNode.removeChild(item);
        }
    }

})()

const app = (function(ui, ctrl) {
    var setEvents = function() {
        document.querySelector('.add-item').addEventListener('click', ctrAddItem)
        
        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13) {
                ctrAddItem();
            }
        })
        
        // mark as completed task listener
        document.querySelector('.list').addEventListener('click', markAsComplete);
        // delete task listener
        document.querySelector('.list').addEventListener('click', deleteItem);
    }

    var deleteItem = function(e) {
        var id = e.target.parentNode.parentNode.id;
        // check if the element that has been clicked is the delete icon;
        if (id && e.toElement.className === "fa fa-trash") {
            // 1- delete item from DS

            // split ID
            var splitID = id.split('-');
            var itemId =  parseInt(splitID[1]);
            ctrl.deleteItem(itemId);


            // 2- delete item from UI
            ui.deleteItem(id);

        }
    }
    var markAsComplete = function(e) {
        // check if the element that has been clicked is the check icon;
        var id = e.target.parentNode.parentNode.id;
        if (id) {
            // check or uncheck the {icon}
            check(e.target, id); 
        }
    
    }
    var check = function(target, id) {
        var target = target;
        var item = document.getElementById(id);
        // switch text
        item.style.textDecoration === 'line-through' ? item.style.textDecoration = 'none' :
        item.style.textDecoration = "line-through";
        // switch color
        target.style.color === 'teal' ? target.style.color = 'snow' : target.style.color = 'teal';

    }
    var ctrAddItem = function() {
        // get input from user
        var input = document.querySelector('.item-cnt').value;
        if (input) {
            // 1- create new Item
             var newItem = ctrl.addItem(input);
            // 2- display item to the ui
            ui.displayItem(newItem);
            // 3- clear input field
            ui.clearInput();
             
        }
    }
    var setDate = function() {
        var dateLeble, date,year, month, day, months;
        dateLeble = document.querySelector('.date');
        date = new Date();
        day = date.getDate();
        year = date.getFullYear();
        month = date.getMonth();
        months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        dateLeble.innerHTML = day + ' , ' + months[month] + ' , ' + year;
                
    }

    return {
        init: function() {
            //set day
            setDate();
            // set events
            setEvents();
        }
    }


})(UIcontroller, controller)

app.init()