#!/usr/bin/env python3
"""
Backend API Testing Suite
Tests all backend endpoints for functionality and responsiveness
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Load the backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading backend URL: {e}")
        return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("ERROR: Could not find REACT_APP_BACKEND_URL in frontend/.env")
    sys.exit(1)

API_BASE = f"{BACKEND_URL}/api"

def test_health_check():
    """Test the root endpoint for basic connectivity"""
    print("Testing Health Check (GET /api/)...")
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Health check passed")
                return True
            else:
                print(f"❌ Health check failed - unexpected response: {data}")
                return False
        else:
            print(f"❌ Health check failed - status code: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Health check failed - connection error: {e}")
        return False

def test_create_status_check():
    """Test creating a status check entry"""
    print("Testing Create Status Check (POST /api/status)...")
    try:
        test_data = {
            "client_name": "TestClient_" + str(uuid.uuid4())[:8]
        }
        
        response = requests.post(
            f"{API_BASE}/status", 
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["id", "client_name", "timestamp"]
            
            if all(field in data for field in required_fields):
                if data["client_name"] == test_data["client_name"]:
                    print("✅ Create status check passed")
                    return True, data["id"]
                else:
                    print(f"❌ Create status check failed - client_name mismatch")
                    return False, None
            else:
                print(f"❌ Create status check failed - missing required fields: {data}")
                return False, None
        else:
            print(f"❌ Create status check failed - status code: {response.status_code}")
            print(f"Response: {response.text}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Create status check failed - connection error: {e}")
        return False, None

def test_get_status_checks():
    """Test retrieving status check entries"""
    print("Testing Get Status Checks (GET /api/status)...")
    try:
        response = requests.get(f"{API_BASE}/status", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"✅ Get status checks passed - retrieved {len(data)} entries")
                return True
            else:
                print(f"❌ Get status checks failed - expected list, got: {type(data)}")
                return False
        else:
            print(f"❌ Get status checks failed - status code: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Get status checks failed - connection error: {e}")
        return False

def test_cors_headers():
    """Test CORS configuration"""
    print("Testing CORS Headers...")
    try:
        # Test preflight request
        response = requests.options(
            f"{API_BASE}/status",
            headers={
                "Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type"
            },
            timeout=10
        )
        
        cors_headers = [
            "access-control-allow-origin",
            "access-control-allow-methods",
            "access-control-allow-headers"
        ]
        
        headers_present = all(header in response.headers for header in cors_headers)
        
        if response.status_code in [200, 204] and headers_present:
            print("✅ CORS configuration passed")
            return True
        else:
            print(f"❌ CORS configuration failed - status: {response.status_code}")
            print(f"Headers: {dict(response.headers)}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ CORS test failed - connection error: {e}")
        return False

def test_server_responsiveness():
    """Test server response times and basic performance"""
    print("Testing Server Responsiveness...")
    try:
        start_time = datetime.now()
        response = requests.get(f"{API_BASE}/", timeout=10)
        end_time = datetime.now()
        
        response_time = (end_time - start_time).total_seconds()
        
        if response.status_code == 200 and response_time < 5.0:
            print(f"✅ Server responsiveness passed - response time: {response_time:.2f}s")
            return True
        else:
            print(f"❌ Server responsiveness failed - time: {response_time:.2f}s, status: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Server responsiveness failed - connection error: {e}")
        return False

def run_all_tests():
    """Run all backend tests and return results"""
    print(f"Starting Backend API Tests")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"API Base: {API_BASE}")
    print("=" * 50)
    
    test_results = {}
    
    # Test 1: Health Check
    test_results['health_check'] = test_health_check()
    
    # Test 2: Server Responsiveness
    test_results['server_responsiveness'] = test_server_responsiveness()
    
    # Test 3: CORS Headers
    test_results['cors_headers'] = test_cors_headers()
    
    # Test 4: Create Status Check
    create_result, created_id = test_create_status_check()
    test_results['create_status_check'] = create_result
    
    # Test 5: Get Status Checks
    test_results['get_status_checks'] = test_get_status_checks()
    
    print("=" * 50)
    print("TEST SUMMARY:")
    
    passed = 0
    total = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend tests PASSED!")
        return True
    else:
        print("⚠️  Some backend tests FAILED!")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)