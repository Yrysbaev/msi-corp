const { Pool } = require('pg');
require('dotenv').config();

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Services data
const services = [
    {
        name: 'Custom Merchandise',
        description: 'Personalized products and branded merchandise for businesses and events. From custom uniforms to promotional items.',
        icon: '🎁'
    },
    {
        name: 'Event Photography',
        description: 'Professional photography services for special events, corporate functions, and personal occasions.',
        icon: '📸'
    },
    {
        name: 'Creative Solutions',
        description: 'Innovative creative services and strategic consulting to help your brand stand out.',
        icon: '💡'
    },
    {
        name: 'Brand Identity',
        description: 'Complete branding packages including logo design, color schemes, and brand guidelines.',
        icon: '🎨'
    },
    {
        name: 'Marketing Materials',
        description: 'Design and production of marketing collateral, business cards, and promotional materials.',
        icon: '📋'
    },
    {
        name: 'Product Photography',
        description: 'High-quality product photography for e-commerce and marketing campaigns.',
        icon: '📷'
    }
];

async function insertServices() {
    try {
        console.log('🔗 Connecting to database...');
        
        // Test connection
        await pool.query('SELECT NOW()');
        console.log('✅ Database connected successfully');
        
        // Clear existing services (optional)
        console.log('🗑️  Clearing existing services...');
        await pool.query('DELETE FROM services');
        
        // Insert new services
        console.log('📝 Inserting services...');
        for (const service of services) {
            const result = await pool.query(
                'INSERT INTO services (name, description, icon) VALUES ($1, $2, $3) RETURNING *',
                [service.name, service.description, service.icon]
            );
            console.log(`✅ Inserted: ${service.name}`);
        }
        
        // Verify insertion
        const result = await pool.query('SELECT * FROM services ORDER BY id');
        console.log('\n📊 Services in database:');
        result.rows.forEach(row => {
            console.log(`- ${row.icon} ${row.name}: ${row.description.substring(0, 50)}...`);
        });
        
        console.log(`\n🎉 Successfully inserted ${result.rows.length} services!`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await pool.end();
    }
}

// Run the script
insertServices(); 