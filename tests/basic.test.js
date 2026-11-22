const test = require('node:test');
const assert = require('node:assert/strict');
test('project metadata is defined', () => { const p=require('../package.json'); assert.equal(p.name,'ecommerce-inventory-capstone'); assert.ok(p.scripts.start); });
test('required project layers exist', () => { const fs=require('fs'); for (const f of ['server.js','models/Product.js','controllers/orderController.js','routes/productRoutes.js','services/eventBus.js']) assert.ok(fs.existsSync(require('path').join(__dirname,'..',f)), f+' should exist'); });
