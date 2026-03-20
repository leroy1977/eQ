// List of pages under review - UPDATE THIS MANUALLY
// Pages intentionally disabled
const underReviewPages = new Set([
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
]);

function normalizePath(path) {
    // Remove duplicate slashes
    path = path.replace(/\/{2,}/g, '/');

    // Remove trailing slash (except root)
    if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
    }

    return path;
}

(function () {
    const path = window.location.pathname;

    if (underReviewPages.has(path)) {
        window.location.replace('/undereview.html');
    }
})();
