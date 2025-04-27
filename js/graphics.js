// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, query, orderBy, getDocs, limit } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDhIfWtYWzH8GeHEtKIyY3fyuwBBx695Q",
  authDomain: "ble-sens-sdb.firebaseapp.com",
  projectId: "ble-sens-sdb",
  storageBucket: "ble-sens-sdb.appspot.com",
  messagingSenderId: "710512551634",
  appId: "1:710512551634:web:4683e809dffab336d56f0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function parseDateAndTime(date, time) {
    const [day, month, year] = date.split('.');
    return new Date(`${year}-${month}-${day}T${time}`);
}

async function loadChartData() {
    const q = query(collection(db, "sensorData"), orderBy("date", "desc"), limit(100));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map(doc => doc.data());

    // Сортировка на клиентской стороне
    data.sort((a, b) => {
        const aDateTime = parseDateAndTime(a.date, a.time);
        const bDateTime = parseDateAndTime(b.date, b.time);
        return aDateTime - bDateTime;
    });

    const timestamps = [];
    const temperatures = [];
    const humidities = [];

    data.forEach(entry => {
        const timestamp = parseDateAndTime(entry.date, entry.time).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        timestamps.push(timestamp);
        temperatures.push(entry.temperature);
        humidities.push(entry.humidity);
    });

    createChart('temperatureChart', 'Температура', timestamps, temperatures, -10, 40);
    createChart('humidityChart', 'Влажность', timestamps, humidities, 0, 100);
}

function createChart(elementId, label, labels, data, minY, maxY) {
    const ctx = document.getElementById(elementId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Время'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: label
                    },
                    min: minY,
                    max: maxY
                }
            }
        }
    });
}

loadChartData();
setInterval(loadChartData, 15000);
