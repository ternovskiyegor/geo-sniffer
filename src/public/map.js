let map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
    });
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Дізнатися свою геолокацію";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(
        locationButton
    );
    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            const token = window.location.pathname.split("/t/")[1];
            console.log(token);

            fetch("http://localhost:3000/api/location", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: token,
                    lat: pos.lat,
                    lng: pos.lng,
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Помилка відправки координат");
                }
                return response.json();
            })
            .then(data => {
                console.log("Координати сбережені: ", data);
            })
            .catch(err => {
                console.error(err);
            });

            infoWindow.setPosition(pos);
            infoWindow.setContent("Ваша геолокація");
            infoWindow.open(map);
            map.setCenter(pos);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
    }

window.initMap = initMap;