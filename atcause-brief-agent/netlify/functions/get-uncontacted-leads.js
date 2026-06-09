/**
 * Netlify Function: get-uncontacted-leads
 * Fetches uncontacted leads from the Lead Response Time page
 * Returns count and details of leads that haven't been called yet
 */

exports.handler = async function(event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // TODO: Replace with actual credentials from environment variables
    // For now, this is a mock implementation that returns sample data
    // In production, you would:
    // 1. Use ZOHO_API_KEY or similar to authenticate
    // 2. Fetch from Zoho CRM API or parse the Lead Response Time page
    
    const mockUncontactedLeads = [
      {
        id: 'lead_001',
        name: 'Megan Mathews',
        phone: '5138841019',
        source: 'Digital Ads',
        owner: 'Jose Chavez',
        created: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: 'Pending',
        timesSinceLead: '2h'
      },
      {
        id: 'lead_002',
        name: 'John Smith',
        phone: '5551234567',
        source: 'Website Form',
        owner: 'Michelle Martz',
        created: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        status: 'Pending',
        timesSinceLead: '45m'
      },
      {
        id: 'lead_003',
        name: 'Sarah Johnson',
        phone: '5559876543',
        source: 'Digital Ads',
        owner: 'Alyssa James',
        created: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        status: 'Pending',
        timesSinceLead: '15m'
      }
    ];

    // Filter for leads that are truly "new" (created in last 30 minutes)
    const now = Date.now();
    const thirtyMinutesAgo = now - (30 * 60 * 1000);
    
    const newUncontactedLeads = mockUncontactedLeads.filter(lead => 
      lead.created.getTime() > thirtyMinutesAgo && lead.status === 'Pending'
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        count: newUncontactedLeads.length,
        leads: newUncontactedLeads,
        timestamp: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      })
    };
  } catch (err) {
    console.error('Error fetching uncontacted leads:', err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: false,
        error: err.message 
      })
    };
  }
};
