async function LoadCsv() {
    const [parsedCsv] = await Promise.all([
        d3.csv("List.csv", (row) => {
            row.name = row.name.split(",");
            row.link = row.link.split(",");
            row.photo = row.photo.split(",");
            return row;
        })
    ]);
    parsed = parsedCsv;
    LoadItems(parsed)
}


/*
parsed.forEach(c =>
    $("#ulBox").append($(`
    <li class="liBox">
        <img Class="icon" src="${photo}">
        <a href="${link}">${name}</a>
    </li>`))
);
*/

function LoadItems(c) {
    var totalCheckboxs = c.length
    for (let i = 0; i<totalCheckboxs; i++) {
        $("#ulBox").append($(`
        <li class="liBox">
            <a href="${c[i].link}">
                <img Class="icon" src="${c[i].photo}">
                ${c[i].name}
            </a>
            <input class="checkbox" type="checkbox" id="checkBox${c[i].name}">
        </li>`))
    }

    function PctChan() {
        let checkedBoxes = $(".checkbox:checked").length
        $("#probNum").html(`${(100*(1 / (totalCheckboxs - checkedBoxes))).toFixed(2)}%`)
        $("#probFrak").html(`1/${totalCheckboxs - checkedBoxes}`)
    }
    PctChan()
    $(".checkbox").change(() => { // same as  $(".checkbox").change(funtion() {
        PctChan()
    })
}

LoadCsv()