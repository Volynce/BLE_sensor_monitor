import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let temperatureChart;
let humidityChart;

function parseDateAndTime(date, time) {
    const [day, month, year] = date.split('.');
    return new Date(`${year}-${month}-${day}T${time}`);
}

async function loadSensorData(startDate, endDate) {
    console.log("Loading sensor data from", startDate, "to", endDate);

    const q = query(
        collection(db, "sensorData"),
        orderBy("date", "asc")
    );

    try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());

        // Сортировка данных по дате и времени на стороне клиента
        const filteredData = data.filter(doc => {
            const timestamp = parseDateAndTime(doc.date, doc.time);
            return timestamp >= new Date(startDate) && timestamp <= new Date(endDate);
        }).sort((a, b) => {
            const dateTimeA = parseDateAndTime(a.date, a.time);
            const dateTimeB = parseDateAndTime(b.date, b.time);
            return dateTimeA - dateTimeB;
        });

        console.log("Filtered Data:", filteredData);

        renderChart(filteredData);
        renderTable(filteredData);
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function renderChart(data) {
    const timestamps = [];
    const temperatures = [];
    const humidities = [];

    data.forEach(entry => {
        const timestamp = parseDateAndTime(entry.date, entry.time).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit' // добавляем секунды для точности
        });
        timestamps.push(timestamp);
        temperatures.push(parseFloat(entry.temperature).toFixed(1));
        humidities.push(parseFloat(entry.humidity).toFixed(1));
    });

    if (temperatureChart) {
        temperatureChart.destroy();
    }
    if (humidityChart) {
        humidityChart.destroy();
    }

    temperatureChart = createChart('temperatureChart', 'Температура', timestamps, temperatures, -10, 40);
    humidityChart = createChart('humidityChart', 'Влажность', timestamps, humidities, 0, 100);
}

function createChart(elementId, label, labels, data, minY, maxY) {
    const ctx = document.getElementById(elementId).getContext('2d');
    return new Chart(ctx, {
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
                    },
                    ticks: {
                        maxTicksLimit: 20 // Увеличиваем количество значений на графике
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

function renderTable(data) {
    const sensorDataTable = document.getElementById('sensorData');
    sensorDataTable.innerHTML = '';

    data.forEach(entry => {
        const temperature = parseFloat(entry.temperature).toFixed(1); // Округляем температуру до 1 знака после запятой
        const humidity = parseFloat(entry.humidity).toFixed(1); // Округляем влажность до одного знака после запятой
        const row = `
            <tr>
                <td>${entry.sensorName}</td>
                <td>${temperature} С</td>
                <td>${humidity}%</td>
                <td>${entry.date}</td>
                <td>${entry.time}</td>
            </tr>
        `;
        sensorDataTable.innerHTML += row;
    });
}

document.getElementById('loadDataBtn').addEventListener('click', () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (startDate && endDate) {
        loadSensorData(startDate, endDate);
    } else {
        alert('Пожалуйста, выберите оба периода: начало и конец.');
    }
});
