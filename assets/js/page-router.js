// List of pages under review - UPDATE THIS MANUALLY
const underReviewPages = [
    '/licenciamento-ambiental.html',
    '/environmental-compliance-permitting.html',
    '/avaliacao-estrategica-territorios.html',
    '/strategic-territory-assessment.html',
    '/monitoramento-ambiental-analise-dados.html',
    '/environmental-monitoring-data-analysis.html',
    '/recuperacao-ambiental.html',
    '/environmental-restoration.html',
    '/educacao-ambiental-esg.html',
    '/environmental-education-esg.html'
];

// Main routing function
async function routePage() {
    // Get the current path
    const currentPath = window.location.pathname;
    
    // Don't route for homepage
    if (currentPath === '/' || currentPath === '/index.html') {
        return;
    }
    
    // Check if the page is under review FIRST
    if (underReviewPages.includes(currentPath)) {
        // Load under review page
        const response = await fetch('/undereview.html');
        const html = await response.text();
        
        // Replace current page with under review content
        document.open();
        document.write(html);
        document.close();
        return;
    }
    
    // Check if the page exists
    try {
        const response = await fetch(currentPath, { method: 'HEAD' });
        
        if (!response.ok) {
            // Load 404 page
            const response404 = await fetch('/404.html');
            const html404 = await response404.text();
            
            document.open();
            document.write(html404);
            document.close();
        }
        // If page exists, do nothing - let it load normally
    } catch {
        // Load 404 page on error
        const response404 = await fetch('/404.html');
        const html404 = await response404.text();
        
        document.open();
        document.write(html404);
        document.close();
    }
}

// Run when page loads
routePage();
