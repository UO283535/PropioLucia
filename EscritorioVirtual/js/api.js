let canvas, ctx, isMousePressed, userLocation;

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    isMousePressed = false;

    // Obtener la ubicación del usuario
    getUserLocation();

    // Configurar el bloqueo del puntero (Pointer Lock)
    setupPointerLock();

    // Dibujar el mapa de fondo y la figura en el lienzo
    drawBackground();
    drawFigure();

    // Agregar eventos de ratón
    canvas.addEventListener('mousedown', () => { isMousePressed = true; });
    canvas.addEventListener('mouseup', () => { isMousePressed = false; });
    canvas.addEventListener('mousemove', handleMouseMove);
});

function getUserLocation() {
    navigator.geolocation.getCurrentPosition(
        position => {
            userLocation = position.coords;
            updateLocationDisplay();
        },
        error => console.error('Error getting location:', error),
        { enableHighAccuracy: true }
    );
}

function updateLocationDisplay() {
    const locationElement = document.querySelector('p');
    locationElement.textContent = `Latitude: ${userLocation.latitude.toFixed(6)}, Longitude: ${userLocation.longitude.toFixed(6)}`;
}

function setupPointerLock() {
    canvas.requestPointerLock =
        canvas.requestPointerLock ||
        canvas.mozRequestPointerLock ||
        canvas.webkitRequestPointerLock;

    document.exitPointerLock =
        document.exitPointerLock ||
        document.mozExitPointerLock ||
        document.webkitExitPointerLock;

    canvas.onclick = () => {
        canvas.requestPointerLock();
    };

    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
    document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);

    function lockChangeAlert() {
        if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas ||
            document.webkitPointerLockElement === canvas) {
            console.log('The pointer lock status is now locked');
        } else {
            console.log('The pointer lock status is now unlocked');
        }
    }
}

function handleMouseMove(event) {
    if (document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas ||
        document.webkitPointerLockElement === canvas) {

        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        // Mover la figura en el lienzo basándonos en el movimiento del ratón
        // Aquí puedes implementar la lógica de movimiento deseada
        console.log('Mouse moved:', movementX, movementY);
    }
}

function drawBackground() {
    const backgroundImage = new Image();
    backgroundImage.src = 'multimedia/imagenes/map.jpg'; // Ruta de la imagen del mapa
    backgroundImage.onload = () => {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
}

function drawFigure() {
    // Dibujar la figura inicial en el lienzo
    ctx.fillStyle = 'blue';
    ctx.fillRect(canvas.width / 2 - 25, canvas.height / 2 - 25, 50, 50);
}
