document.getElementById('medicationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var medicationName = document.getElementById('medicationName').value;
    var dosage = document.getElementById('dosage').value;
    var frequency = parseInt(document.getElementById('frequency').value);

    setMedicationReminder(medicationName, dosage, frequency);
    document.getElementById('notificationArea').innerText = 'Reminder set for ' + medicationName + ' every ' + frequency + ' hours.';
    saveMedication(medicationName, dosage, frequency);
});

function setMedicationReminder(name, dosage, hours) {
    var frequencyMs = hours * 60 * 60 * 1000;

    document.getElementById("fc").style.display = "none";
    document.getElementById("sc").style.display = "none";
    document.getElementById("tc").style.display = "block";
    setTimeout(function () {
        document.getElementById("tc").style.display = "none";
        document.getElementById("sc").style.display = "block";
        document.getElementById("sc").children[0].children[1].style.innerText = `${dosage} dose(s) of ${medicationName}`;
        document.getElementById("again").addEventListener('click', () => {
            setMedicationReminder(name, dosage, hours);
        })
        document.getElementById("new").addEventListener('click', () => {
        document.getElementById("fc").style.display = "block";
        document.getElementById('notificationArea').innerText = '';
        document.getElementById("tc").style.display = "none";
        document.getElementById("sc").style.display = "none";
        })
    }, frequencyMs);
}

function saveMedication(name, dosage, frequency) {
    localStorage.setItem('medication', JSON.stringify({ name, dosage, frequency }));
}

document.addEventListener('DOMContentLoaded', function() {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                var medication = JSON.parse(localStorage.getItem('medication'));
                if (medication) {
                    setMedicationReminder(medication.name, medication.dosage, medication.frequency);
                }
            }
        });
    }
});
