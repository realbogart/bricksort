var tables = document.getElementsByTagName('table');
for (var i = 0; i < tables.length; i++) {
    if (tables[i].innerHTML.includes('My Remarks:')) {
        console.log("Table with 'My Remarks:' found");
        var tbodies = tables[i].getElementsByTagName('tbody');
        var innermostTbody = tbodies[tbodies.length - 1]; // Get the last (innermost) tbody
        processTable(innermostTbody);
        break;
    }
}

function processTable(tbody) {
    var rows = Array.from(tbody.children);
    var rowGroups = [];
    var currentGroup = [];

    rows.forEach(function (row, index) {
        // Start a new group when a row with class 'tm' is found
        if (row.classList.contains('tm')) {
            if (currentGroup.length > 0) {
                rowGroups.push(currentGroup);
            }
            currentGroup = [row];
        } else {
            // Continue adding rows to the current group
            currentGroup.push(row);
        }
    });

    // Add the last group if it contains rows
    if (currentGroup.length > 0) {
        rowGroups.push(currentGroup);
    }

    console.log("Number of groups found:", rowGroups.length);

    // Sort the row groups based on the remarks text
    rowGroups.sort(function (a, b) {
        var remarkA = getRemarkText(a);
        var remarkB = getRemarkText(b);
        return remarkA.localeCompare(remarkB);
    });

    // Clear the tbody and reinsert the sorted groups
    tbody.innerHTML = '';
    rowGroups.forEach(function (group) {
        group.forEach(function (element) {
            tbody.appendChild(element);
        });
    });
}

function getRemarkText(group) {
    for (var i = 0; i < group.length; i++) {
        if (group[i].innerHTML && group[i].innerHTML.includes('My Remarks:')) {
            var match = group[i].innerText.match(/My Remarks: (.*)/);
            return match ? match[1] : '';
        }
    }
    return '';
}
