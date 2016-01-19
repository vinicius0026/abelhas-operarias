/* globals inject, beforeEach, afterEach, describe, it, expect */

(function () {
    'use strict';

    var apiUrl = 'http://api.fiddus.com.br:9000',
        $http,
        $httpBackend,
        ApiRequests;

    describe('API Requests Test ::', function () {

        beforeEach(angular.mock.module('factory-api-requests'));

        beforeEach(inject(function (_$http_, _$httpBackend_, _ApiRequests_) {
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            ApiRequests = _ApiRequests_;
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        it('ApiRequest should exists', function () {
            expect(ApiRequests).to.exist;
        });


        describe('Test API GET request ::', function () {

            it('Should get 504 Gateway Timeout answer', function () {
                var reqObj = {
                        method: 'GET',
                        url: apiUrl.concat('/api/get/')
                    },
                    expResponse = {
                        error: 'Gateway Timeout'
                    };

                $httpBackend
                    .expectGET(apiUrl.concat('/api/get/'))
                    .respond(function () {
                        return [504, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(504);
                        expect(res.data.error).to.equal('Gateway Timeout');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/get/');
                        expect(res.config.method).to.equal('GET');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 502 Bad Gateway answer', function () {
                var reqObj = {
                        method: 'GET',
                        url: apiUrl.concat('/api/get/')
                    },
                    expResponse = {
                        error: 'Bad Gateway'
                    };

                $httpBackend
                    .expectGET(apiUrl.concat('/api/get/'))
                    .respond(function () {
                        return [502, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(502);
                        expect(res.data.error).to.equal('Bad Gateway');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/get/');
                        expect(res.config.method).to.equal('GET');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 501 Not Implemented answer', function () {
                var reqObj = {
                        method: 'GET',
                        url: apiUrl.concat('/api/get/')
                    },
                    expResponse = {
                        error: 'Not Implemented'
                    };

                $httpBackend
                    .expectGET(apiUrl.concat('/api/get/'))
                    .respond(function () {
                        return [501, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(501);
                        expect(res.data.error).to.equal('Not Implemented');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/get/');
                        expect(res.config.method).to.equal('GET');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 500 Internal Server Error answer', function () {
                var reqObj = {
                        method: 'GET',
                        url: apiUrl.concat('/api/get/')
                    },
                    expResponse = {
                        error: 'Internal Server Error'
                    };

                $httpBackend
                    .expectGET(apiUrl.concat('/api/get/'))
                    .respond(function () {
                        return [500, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(500);
                        expect(res.data.error).to.equal('Internal Server Error');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/get/');
                        expect(res.config.method).to.equal('GET');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 404 Not Found answer', function () {
                var reqObj = {
                        method: 'GET',
                        url: apiUrl.concat('/api/get/')
                    },
                    expResponse = {
                        error: 'Not Found'
                    };

                $httpBackend
                    .expectGET(apiUrl.concat('/api/get/'))
                    .respond(function () {
                        return [404, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(404);
                        expect(res.data.error).to.equal('Not Found');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/get/');
                        expect(res.config.method).to.equal('GET');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 403 Forbidden answer', function () {
                var reqObj = {
                        method: 'GET',
                        url: apiUrl.concat('/api/get/')
                    },
                    expResponse = {
                        error: 'Forbidden'
                    };

                $httpBackend
                    .expectGET(apiUrl.concat('/api/get/'))
                    .respond(function () {
                        return [403, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(403);
                        expect(res.data.error).to.equal('Forbidden');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/get/');
                        expect(res.config.method).to.equal('GET');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 401 Unauthorized answer', function () {
                var reqObj = {
                        method: 'GET',
                        url: apiUrl.concat('/api/get/')
                    },
                    expResponse = {
                        error: 'Unauthorized'
                    };

                $httpBackend
                    .expectGET(apiUrl.concat('/api/get/'))
                    .respond(function () {
                        return [401, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(401);
                        expect(res.data.error).to.equal('Unauthorized');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/get/');
                        expect(res.config.method).to.equal('GET');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 400 Bad Request answer', function () {
                var reqObj = {
                        method: 'GET',
                        url: apiUrl.concat('/api/get/')
                    },
                    expResponse = {
                        error: 'Bad Request'
                    };

                $httpBackend
                    .expectGET(apiUrl.concat('/api/get/'))
                    .respond(function () {
                        return [400, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(400);
                        expect(res.data.error).to.equal('Bad Request');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/get/');
                        expect(res.config.method).to.equal('GET');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 200 OK answer when retrieved', function () {
                var reqObj = {
                        method: 'GET',
                        url: apiUrl.concat('/api/get/')
                    },
                    expResponse = {
                        message: 'Retrieved'
                    };

                $httpBackend
                    .expectGET(apiUrl.concat('/api/get/'))
                    .respond(function () {
                        return [200, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Retrieved'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res.status).to.equal(200);
                        expect(res.data.message).to.equal('Retrieved');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/get/');
                        expect(res.config.method).to.equal('GET');
                        expect(res.statusText).to.equal('Retrieved');
                    }, function (error) {
                        expect(error).to.not.exist;
                    });

                $httpBackend.flush();
            });
        });


        describe('Test API POST request ::', function () {

            it('Should get 504 Gateway Timeout answer', function () {
                var reqObj = {
                        method: 'POST',
                        url: apiUrl.concat('/api/post/'),
                        data: {
                            content: 'Content'
                        }
                    },
                    expResponse = {
                        error: 'Gateway Timeout'
                    };

                $httpBackend
                    .expectPOST(apiUrl.concat('/api/post/'), reqObj.data)
                    .respond(function () {
                        return [504, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(504);
                        expect(res.data.error).to.equal('Gateway Timeout');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/post/');
                        expect(res.config.method).to.equal('POST');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 502 Bad Gateway answer', function () {
                var reqObj = {
                        method: 'POST',
                        url: apiUrl.concat('/api/post/'),
                        data: {
                            content: 'Content'
                        }
                    },
                    expResponse = {
                        error: 'Bad Gateway'
                    };

                $httpBackend
                    .expectPOST(apiUrl.concat('/api/post/'), reqObj.data)
                    .respond(function () {
                        return [502, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(502);
                        expect(res.data.error).to.equal('Bad Gateway');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/post/');
                        expect(res.config.method).to.equal('POST');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 501 Not Implemented answer', function () {
                var reqObj = {
                        method: 'POST',
                        url: apiUrl.concat('/api/post/'),
                        data: {
                            content: 'Content'
                        }
                    },
                    expResponse = {
                        error: 'Not Implemented'
                    };

                $httpBackend
                    .expectPOST(apiUrl.concat('/api/post/'), reqObj.data)
                    .respond(function () {
                        return [501, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(501);
                        expect(res.data.error).to.equal('Not Implemented');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/post/');
                        expect(res.config.method).to.equal('POST');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 500 Internal Server Error answer', function () {
                var reqObj = {
                        method: 'POST',
                        url: apiUrl.concat('/api/post/'),
                        data: {
                            content: 'Content'
                        }
                    },
                    expResponse = {
                        error: 'Internal Server Error'
                    };

                $httpBackend
                    .expectPOST(apiUrl.concat('/api/post/'), reqObj.data)
                    .respond(function () {
                        return [500, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(500);
                        expect(res.data.error).to.equal('Internal Server Error');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/post/');
                        expect(res.config.method).to.equal('POST');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 404 Not Found answer', function () {
                var reqObj = {
                        method: 'POST',
                        url: apiUrl.concat('/api/post/'),
                        data: {
                            content: 'Content'
                        }
                    },
                    expResponse = {
                        error: 'Not Found'
                    };

                $httpBackend
                    .expectPOST(apiUrl.concat('/api/post/'), reqObj.data)
                    .respond(function () {
                        return [404, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(404);
                        expect(res.data.error).to.equal('Not Found');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/post/');
                        expect(res.config.method).to.equal('POST');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 403 Forbidden answer', function () {
                var reqObj = {
                        method: 'POST',
                        url: apiUrl.concat('/api/post/'),
                        data: {
                            content: 'Content'
                        }
                    },
                    expResponse = {
                        error: 'Forbidden'
                    };

                $httpBackend
                    .expectPOST(apiUrl.concat('/api/post/'), reqObj.data)
                    .respond(function () {
                        return [403, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(403);
                        expect(res.data.error).to.equal('Forbidden');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/post/');
                        expect(res.config.method).to.equal('POST');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 401 Unauthorized answer', function () {
                var reqObj = {
                        method: 'POST',
                        url: apiUrl.concat('/api/post/'),
                        data: {
                            content: 'Content'
                        }
                    },
                    expResponse = {
                        error: 'Unauthorized'
                    };

                $httpBackend
                    .expectPOST(apiUrl.concat('/api/post/'), reqObj.data)
                    .respond(function () {
                        return [401, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(401);
                        expect(res.data.error).to.equal('Unauthorized');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/post/');
                        expect(res.config.method).to.equal('POST');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 400 Bad Request answer', function () {
                var reqObj = {
                        method: 'POST',
                        url: apiUrl.concat('/api/post/'),
                        data: {
                            content: 'Content'
                        }
                    },
                    expResponse = {
                        error: 'Bad Request'
                    };

                $httpBackend
                    .expectPOST(apiUrl.concat('/api/post/'), reqObj.data)
                    .respond(function () {
                        return [400, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(400);
                        expect(res.data.error).to.equal('Bad Request');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/post/');
                        expect(res.config.method).to.equal('POST');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 200 OK answer when created', function () {
                var reqObj = {
                        method: 'POST',
                        url: apiUrl.concat('/api/post/'),
                        data: {
                            content: 'Content'
                        }
                    },
                    expResponse = {
                        message: 'Created'
                    };

                $httpBackend
                    .expectPOST(apiUrl.concat('/api/post/'), reqObj.data)
                    .respond(function () {
                        return [201, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Created'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res.status).to.equal(201);
                        expect(res.data.message).to.equal('Created');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/post/');
                        expect(res.config.method).to.equal('POST');
                        expect(res.config.data).to.deep.equal(reqObj.data);
                        expect(res.statusText).to.equal('Created');
                    }, function (error) {
                        expect(error).to.not.exist;
                    });

                $httpBackend.flush();
            });
        });


        describe('Test API PUT request ::', function () {

            it('Should get 504 Gateway Timeout answer', function () {
                var reqObj = {
                        method: 'PUT',
                        url: apiUrl.concat('/api/put/'),
                        data: {
                            content: 'Chaged content'
                        }
                    },
                    expResponse = {
                        error: 'Gateway Timeout'
                    };

                $httpBackend
                    .expectPUT(apiUrl.concat('/api/put/'), reqObj.data)
                    .respond(function () {
                        return [504, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(504);
                        expect(res.data.error).to.equal('Gateway Timeout');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/put/');
                        expect(res.config.method).to.equal('PUT');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 502 Bad Gateway answer', function () {
                var reqObj = {
                        method: 'PUT',
                        url: apiUrl.concat('/api/put/'),
                        data: {
                            content: 'Chaged content'
                        }
                    },
                    expResponse = {
                        error: 'Bad Gateway'
                    };

                $httpBackend
                    .expectPUT(apiUrl.concat('/api/put/'), reqObj.data)
                    .respond(function () {
                        return [502, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(502);
                        expect(res.data.error).to.equal('Bad Gateway');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/put/');
                        expect(res.config.method).to.equal('PUT');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 501 Not Implemented answer', function () {
                var reqObj = {
                        method: 'PUT',
                        url: apiUrl.concat('/api/put/'),
                        data: {
                            content: 'Chaged content'
                        }
                    },
                    expResponse = {
                        error: 'Not Implemented'
                    };

                $httpBackend
                    .expectPUT(apiUrl.concat('/api/put/'), reqObj.data)
                    .respond(function () {
                        return [501, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(501);
                        expect(res.data.error).to.equal('Not Implemented');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/put/');
                        expect(res.config.method).to.equal('PUT');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 500 Internal Server Error answer', function () {
                var reqObj = {
                        method: 'PUT',
                        url: apiUrl.concat('/api/put/'),
                        data: {
                            content: 'Chaged content'
                        }
                    },
                    expResponse = {
                        error: 'Internal Server Error'
                    };

                $httpBackend
                    .expectPUT(apiUrl.concat('/api/put/'), reqObj.data)
                    .respond(function () {
                        return [500, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(500);
                        expect(res.data.error).to.equal('Internal Server Error');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/put/');
                        expect(res.config.method).to.equal('PUT');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 404 Not Found answer', function () {
                var reqObj = {
                        method: 'PUT',
                        url: apiUrl.concat('/api/put/'),
                        data: {
                            content: 'Chaged content'
                        }
                    },
                    expResponse = {
                        error: 'Not Found'
                    };

                $httpBackend
                    .expectPUT(apiUrl.concat('/api/put/'), reqObj.data)
                    .respond(function () {
                        return [404, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(404);
                        expect(res.data.error).to.equal('Not Found');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/put/');
                        expect(res.config.method).to.equal('PUT');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 403 Forbidden answer', function () {
                var reqObj = {
                        method: 'PUT',
                        url: apiUrl.concat('/api/put/'),
                        data: {
                            content: 'Chaged content'
                        }
                    },
                    expResponse = {
                        error: 'Forbidden'
                    };

                $httpBackend
                    .expectPUT(apiUrl.concat('/api/put/'), reqObj.data)
                    .respond(function () {
                        return [403, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(403);
                        expect(res.data.error).to.equal('Forbidden');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/put/');
                        expect(res.config.method).to.equal('PUT');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 401 Unauthorized answer', function () {
                var reqObj = {
                        method: 'PUT',
                        url: apiUrl.concat('/api/put/'),
                        data: {
                            content: 'Chaged content'
                        }
                    },
                    expResponse = {
                        error: 'Unauthorized'
                    };

                $httpBackend
                    .expectPUT(apiUrl.concat('/api/put/'), reqObj.data)
                    .respond(function () {
                        return [401, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(401);
                        expect(res.data.error).to.equal('Unauthorized');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/put/');
                        expect(res.config.method).to.equal('PUT');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 400 Bad Request answer', function () {
                var reqObj = {
                        method: 'PUT',
                        url: apiUrl.concat('/api/put/'),
                        data: {
                            content: 'Chaged content'
                        }
                    },
                    expResponse = {
                        error: 'Bad Request'
                    };

                $httpBackend
                    .expectPUT(apiUrl.concat('/api/put/'), reqObj.data)
                    .respond(function () {
                        return [400, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(400);
                        expect(res.data.error).to.equal('Bad Request');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/put/');
                        expect(res.config.method).to.equal('PUT');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 200 OK answer', function () {
                var reqObj = {
                        method: 'PUT',
                        url: apiUrl.concat('/api/put/'),
                        data: {
                            content: 'Chaged content'
                        }
                    },
                    expResponse = {
                        message: 'Updated'
                    };

                $httpBackend
                    .expectPUT(apiUrl.concat('/api/put/'), reqObj.data)
                    .respond(function () {
                        return [200, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Updated'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res.status).to.equal(200);
                        expect(res.data.message).to.equal('Updated');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/put/');
                        expect(res.config.method).to.equal('PUT');
                        expect(res.config.data).to.deep.equal(reqObj.data);
                        expect(res.statusText).to.equal('Updated');
                    }, function (error) {
                        expect(error).to.not.exist;
                    });

                $httpBackend.flush();
            });
        });


        describe('Test API DELETE request ::', function () {

            it('Should get 504 Gateway Timeout answer', function () {
                var reqObj = {
                        method: 'DELETE',
                        url: apiUrl.concat('/api/delete/')
                    },
                    expResponse = {
                        error: 'Gateway Timeout'
                    };

                $httpBackend
                    .expectDELETE(apiUrl.concat('/api/delete/'))
                    .respond(function () {
                        return [504, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(504);
                        expect(res.data.error).to.equal('Gateway Timeout');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/delete/');
                        expect(res.config.method).to.equal('DELETE');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 502 Bad Gateway answer', function () {
                var reqObj = {
                        method: 'DELETE',
                        url: apiUrl.concat('/api/delete/')
                    },
                    expResponse = {
                        error: 'Bad Gateway'
                    };

                $httpBackend
                    .expectDELETE(apiUrl.concat('/api/delete/'))
                    .respond(function () {
                        return [502, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(502);
                        expect(res.data.error).to.equal('Bad Gateway');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/delete/');
                        expect(res.config.method).to.equal('DELETE');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 501 Not Implemented answer', function () {
                var reqObj = {
                        method: 'DELETE',
                        url: apiUrl.concat('/api/delete/')
                    },
                    expResponse = {
                        error: 'Not Implemented'
                    };

                $httpBackend
                    .expectDELETE(apiUrl.concat('/api/delete/'))
                    .respond(function () {
                        return [501, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(501);
                        expect(res.data.error).to.equal('Not Implemented');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/delete/');
                        expect(res.config.method).to.equal('DELETE');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 500 Internal Server Error answer', function () {
                var reqObj = {
                        method: 'DELETE',
                        url: apiUrl.concat('/api/delete/')
                    },
                    expResponse = {
                        error: 'Internal Server Error'
                    };

                $httpBackend
                    .expectDELETE(apiUrl.concat('/api/delete/'))
                    .respond(function () {
                        return [500, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(500);
                        expect(res.data.error).to.equal('Internal Server Error');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/delete/');
                        expect(res.config.method).to.equal('DELETE');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 404 Not Found answer', function () {
                var reqObj = {
                        method: 'DELETE',
                        url: apiUrl.concat('/api/delete/')
                    },
                    expResponse = {
                        error: 'Not Found'
                    };

                $httpBackend
                    .expectDELETE(apiUrl.concat('/api/delete/'))
                    .respond(function () {
                        return [404, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(404);
                        expect(res.data.error).to.equal('Not Found');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/delete/');
                        expect(res.config.method).to.equal('DELETE');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 403 Forbidden answer', function () {
                var reqObj = {
                        method: 'DELETE',
                        url: apiUrl.concat('/api/delete/')
                    },
                    expResponse = {
                        error: 'Forbidden'
                    };

                $httpBackend
                    .expectDELETE(apiUrl.concat('/api/delete/'))
                    .respond(function () {
                        return [403, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(403);
                        expect(res.data.error).to.equal('Forbidden');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/delete/');
                        expect(res.config.method).to.equal('DELETE');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 401 Unauthorized answer', function () {
                var reqObj = {
                        method: 'DELETE',
                        url: apiUrl.concat('/api/delete/')
                    },
                    expResponse = {
                        error: 'Unauthorized'
                    };

                $httpBackend
                    .expectDELETE(apiUrl.concat('/api/delete/'))
                    .respond(function () {
                        return [401, expResponse, {Accept: 'application/json, text/plain, */*'}, 'Oops!'];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(401);
                        expect(res.data.error).to.equal('Unauthorized');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/delete/');
                        expect(res.config.method).to.equal('DELETE');
                        expect(res.statusText).to.equal('Oops!');
                    });

                $httpBackend.flush();
            });


            it('Should get 400 Bad Request answer', function () {
                var reqObj = {
                        method: 'DELETE',
                        url: apiUrl.concat('/api/delete/')
                    },
                    expResponse = {
                        error: 'Bad Request'
                    };

                $httpBackend
                    .expectDELETE(apiUrl.concat('/api/delete/'))
                    .respond(function () {
                        return [400, expResponse, {Accept: 'application/json, text/plain, */*'}];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res).to.not.exist;
                    }, function (res) {
                        expect(res.status).to.equal(400);
                        expect(res.data.error).to.equal('Bad Request');
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/delete/');
                        expect(res.config.method).to.equal('DELETE');
                        expect(res.statusText).to.be.empty;
                    });

                $httpBackend.flush();
            });


            it('Should get 204 OK answer', function () {
                var reqObj = {
                        method: 'DELETE',
                        url: apiUrl.concat('/api/delete/')
                    };

                $httpBackend
                    .expectDELETE(apiUrl.concat('/api/delete/'))
                    .respond(function () {
                        return [204, {Accept: 'application/json, text/plain, */*'}];
                    });

                ApiRequests.req(reqObj)
                    .then(function (res) {
                        expect(res.status).to.equal(204);
                        expect(res.config.url).to.equal('http://api.fiddus.com.br:9000/api/delete/');
                        expect(res.config.method).to.equal('DELETE');
                        expect(res.statusText).to.be.empty;
                    }, function (error) {
                        expect(error).to.not.exist;
                    });

                $httpBackend.flush();
            });
        });
    });
})();

