def test_return_html(webapp):
    for path in ['/', '/chat', '/login']:
        request, response = webapp.test_client.get(path)
        assert response.status == 200

    request, response = webapp.test_client.get('/badpath')
    assert response.status == 404
