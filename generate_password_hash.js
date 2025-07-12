const bcrypt = require('bcryptjs');

const password = 'admin123';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error('Error generating hash:', err);
    } else {
        console.log('Password:', password);
        console.log('Bcrypt Hash:', hash);
        console.log('\nUse this hash in your SQL INSERT statement:');
        console.log(`INSERT INTO admin_users (username, password_hash, email) VALUES ('admin', '${hash}', 'admin@msicorp.xyz');`);
    }
}); 