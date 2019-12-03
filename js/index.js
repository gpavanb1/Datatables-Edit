var index = 0;

$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip({
        boundary: "window",
        container: "body"
    }); 
  var actions = `<a class="add" title="Confirm" data-toggle="tooltip"><i class="fa fa-check"></i></a>
                 <a class="edit" title="Edit" data-toggle="tooltip"><i class="fas fa-edit"></i></a>
                 <a class="delete" title="Delete" data-toggle="tooltip"><i class="fa fa-trash"></i></a>`;
  var dataTable = $('#dtBasic').DataTable({
    dom: 'lfrtBip',
    "paging": true, // false to disable pagination (or any other option)
    "ordering": false, //disable ordering
    "scrollY": "300px",
    "scrollCollapse": true,
    buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ]
  });
  dataTable.draw();
  
  $('.table-add').click(function() {
    $(this).attr("disabled", "disabled");
    var row = '<tr class="hide">'+
    '<td><input type="text" class="form-control" name="name" id="name"></td>' +
    '<td><input type="text" class="form-control" name="department" id="department"></td>' +
    '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
    '<td><input type="text" class="form-control" name="name" id="name"></td>' +
    '<td><input type="text" class="form-control" name="department" id="department"></td>' +
    '<td>' + actions + '</td>' +
    '</tr>';
    dataTable.row.add($(row)).draw();
    $("table tbody tr").eq(index).find(".add, .edit").toggle();
    index += 1;
    $('[data-toggle="tooltip"]').tooltip({
        boundary: "window",
        container: "body"
    });;
  });
  
    // Add row on add button click
    $(document).on("click", ".add", function(){
        var empty = false;
        var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function(){
            if(!$(this).val()){
                $(this).addClass("error");
                empty = true;
            } else{
                $(this).removeClass("error");
            }
        });
        $(this).parents("tr").find(".error").first().focus();
        if(!empty){
            input.each(function(){
                $(this).parent("td").html($(this).val());
            });
            $(this).parents("tr").find(".add, .edit").toggle();
            $(".add-new").removeAttr("disabled");
        }
        // Remove input-box row and put value row
        $(this).tooltip('hide');
        var lastHTML = '<tr>' + $(this).parents("tr").html() + '</tr>';
        dataTable.row($(this).parents("tr")).remove();
        dataTable.row.add($(lastHTML)).draw();
    });

    // Edit row on edit button click
    $(document).on("click", ".edit", function(){
        $(this).parents("tr").find("td:not(:last-child)").each(function(){
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
        });		
        $(this).parents("tr").find(".add, .edit").toggle();
        $(".add-new").attr("disabled", "disabled");
    });

    // Delete row on delete button click
    $(document).on("click", ".delete", function(){
        $(this).tooltip('hide');
        dataTable.row($(this).parents("tr")).remove().draw();
        $(".add-new").removeAttr("disabled");
        index -= 1;
    });

});
 
