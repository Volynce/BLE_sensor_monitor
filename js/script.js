// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function renderRealtimeData(doc) {
    try {
        const data = doc.data();
        if (!data.temperature || !data.humidity || !data.date || !data.time || !data.sensorName) {
            console.error('Invalid data structure:', data);
            return;
        }

        const temperature = parseFloat(data.temperature).toFixed(1);
        const humidity = parseFloat(data.humidity).toFixed(1);
        const date = data.date;
        const time = data.time;

        const row = `
            <tr>
                <td>${data.sensorName}</td>
                <td>${temperature} С</td>
                <td>${humidity}%</td>
                <td>${date}</td>
                <td>${time}</td>
            </tr>
        `;
        document.getElementById('realtimeSensorData').innerHTML = row;
    } catch (error) {
        console.error('Error rendering real-time data:', error);
    }
}

function renderLatestEntries(docs) {
    const latestSensorDataTable = document.getElementById('latestSensorData');
    latestSensorDataTable.innerHTML = '';

    docs.forEach(doc => {
        try {
            const data = doc.data();
            if (!data.temperature || !data.humidity || !data.date || !data.time || !data.sensorName) {
                console.error('Invalid data structure:', data);
                return;
            }

            const temperature = parseFloat(data.temperature).toFixed(1);
            const humidity = parseFloat(data.humidity).toFixed(1);
            const date = data.date;
            const time = data.time;

            const row = `
                <tr>
                    <td>${data.sensorName}</td>
                    <td>${temperature} С</td>
                    <td>${humidity}%</td>
                    <td>${date}</td>
                    <td>${time}</td>
                </tr>
            `;
            latestSensorDataTable.innerHTML += row;
        } catch (error) {
            console.error('Error rendering latest entries:', error);
        }
    });
}

async function getLatestSensorData() {
    const q = query(collection(db, "sensorData"), orderBy("date", "desc"), limit(50));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;

    // Сортировка на клиентской стороне
    docs.sort((a, b) => {
        const aData = a.data();
        const bData = b.data();
        const aDateTime = new Date(`${aData.date.split('.').reverse().join('-')}T${aData.time}`);
        const bDateTime = new Date(`${bData.date.split('.').reverse().join('-')}T${bData.time}`);
        return bDateTime - aDateTime;
    });

    if (docs.length > 0) {
        renderRealtimeData(docs[0]);
    }
}

async function getLatestEntries() {
    const q = query(collection(db, "sensorData"), orderBy("date", "desc"), limit(50));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;

    // Сортировка на клиентской стороне
    docs.sort((a, b) => {
        const aData = a.data();
        const bData = b.data();
        const aDateTime = new Date(`${aData.date.split('.').reverse().join('-')}T${aData.time}`);
        const bDateTime = new Date(`${bData.date.split('.').reverse().join('-')}T${bData.time}`);
        return bDateTime - aDateTime;
    });

    renderLatestEntries(docs.slice(0, 15));
}

// Запускаем обновление данных в реальном времени
getLatestSensorData();
setInterval(getLatestSensorData, 15000);

// Запускаем обновление последних 15 записей
getLatestEntries();
setInterval(getLatestEntries, 15000);
