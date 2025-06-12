const getImageDimensions = async (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject;

      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default getImageDimensions;
