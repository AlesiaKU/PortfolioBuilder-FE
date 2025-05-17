export async function log(type, message, data = null) {
  const timestamp = new Date().toISOString();
  //console.log(`[${timestamp}] [${type}] ${message}`, data || '');

  try {
    // Отправка лога на сервер
    await fetch('http://26.188.13.76:8080/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp,
        type,
        message,
        data, // Дополнительные данные
      }),
    });
  } catch (error) {
    //console.error('Failed to send log to server', error);
  }
}
