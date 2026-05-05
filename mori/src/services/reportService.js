const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Process report input and get AI analysis
 */
export async function processReport(type, data) {
  try {
    const formData = new FormData();
    formData.append('type', type);

    switch (type) {
      case 'text':
        formData.append('textInput', data.textInput);
        break;

      case 'image':
        formData.append('file', data.imageFile);
        if (data.imageDescription) {
          formData.append('imageDescription', data.imageDescription);
        }
        break;

      case 'audio':
        formData.append('file', data.audioBlob);
        break;

      default:
        throw new Error('Invalid report type');
    }

    const response = await fetch(`${API_BASE_URL}/reports/process`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to process report');
    }

    return result.data;
  } catch (error) {
    console.error('Error processing report:', error);
    throw error;
  }
}

/**
 * Submit final report to agencies
 */
export async function submitReport(reportData) {
  try {
    const response = await fetch(`${API_BASE_URL}/reports/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit report');
    }

    return result;
  } catch (error) {
    console.error('Error submitting report:', error);
    throw error;
  }
}
