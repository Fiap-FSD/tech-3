export const extractYouTubeId = (url: string): string | null => {
  const regExp = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|.*[?&]v%3D)([a-zA-Z0-9_-]{11}))/;
  const match = url.match(regExp);
  return match ? match[1] : null; // Retorna o ID se encontrado, caso contrário, retorna null
};
