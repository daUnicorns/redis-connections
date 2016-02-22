(function showTimes(){
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function() {
        if (xml.readyState === 4 && xml.status === 200) {
            console.log(xml.responseText);
            var object = JSON.parse(xml.responseText);
            for (var person in object){
                var liNode = document.createElement('li');
                liNode.innerHTML = person + ': ' + object[person];
                document.getElementById('times').appendChild(liNode);
            }
        }
        else if (xml.status === 404) {
            document.getElementById('sorry').innerHTML = 'Sorry, the database is empty';
        }
    };
    xml.open('GET', '/getTimes');
    xml.send();
})();

document.getElementById('button').addEventListener('click',function(){
    console.log('clicked!');
    var person = document.getElementById('person').value;
    var time = document.getElementById('time').value;
    var url = '/newTime?name=' + person + '&time=' + time;

    var xml = new XMLHttpRequest();

    xml.open('POST', url);
    xml.send();
    document.getElementById('person').value = "";
    document.getElementById('time').value = "";
});
