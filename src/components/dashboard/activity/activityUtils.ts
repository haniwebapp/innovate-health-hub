
// Helper function to format timestamps
export const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;
  
  if (diff < minute) {
    return 'Just now';
  } else if (diff < hour) {
    const mins = Math.floor(diff / minute);
    return `${mins} ${mins === 1 ? 'min' : 'mins'} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diff < 7 * day) {
    const days = Math.floor(diff / day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  }
};

// Helper function to get activity badges
export const getActivityBadge = (type: string) => {
  const badges = {
    'innovation': 'bg-moh-lightGreen text-moh-darkGreen',
    'challenge': 'bg-blue-100 text-blue-800',
    'knowledge': 'bg-purple-100 text-purple-800',
    'investment': 'bg-amber-100 text-amber-800',
    'regulatory': 'bg-red-100 text-red-800'
  };
  
  return badges[type as keyof typeof badges] || 'bg-gray-100 text-gray-800';
};

// Helper function to get readable action text
export const getActionText = (action: string) => {
  const actions = {
    'submission_viewed': 'viewed your submission',
    'submission_updated': 'updated submission status',
    'document_downloaded': 'downloaded document',
    'application_started': 'started an application',
    'documents_submitted': 'submitted documents'
  };
  
  return actions[action as keyof typeof actions] || action;
};
