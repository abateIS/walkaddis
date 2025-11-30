<?php
// Test admin login
require_once 'backend/config.php';

$email = 'admin@walkaddis.com';
$password = 'admin123';

try {
    $pdo = getDBConnection();
    
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = :email");
    $stmt->execute([':email' => $email]);
    $admin = $stmt->fetch();
    
    if (!$admin) {
        echo "✗ Admin user not found!\n";
        exit(1);
    }
    
    echo "✓ Admin user found:\n";
    echo "  ID: {$admin['id']}\n";
    echo "  Username: {$admin['username']}\n";
    echo "  Email: {$admin['email']}\n";
    echo "  Password Hash: {$admin['password_hash']}\n\n";
    
    echo "Testing password verification...\n";
    if (password_verify($password, $admin['password_hash'])) {
        echo "✓ Password 'admin123' VERIFIES CORRECTLY!\n";
    } else {
        echo "✗ Password 'admin123' DOES NOT VERIFY!\n";
        echo "\nThe password hash in the database is incorrect.\n";
        echo "Let's generate a new hash and update it...\n\n";
        
        $newHash = password_hash($password, PASSWORD_DEFAULT);
        echo "New hash: $newHash\n\n";
        
        $updateStmt = $pdo->prepare("UPDATE admins SET password_hash = :hash WHERE email = :email");
        $updateStmt->execute([':hash' => $newHash, ':email' => $email]);
        
        echo "✓ Password hash updated in database!\n";
        echo "✓ You can now login with: admin@walkaddis.com / admin123\n";
    }
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    exit(1);
}


