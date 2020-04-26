// compat: Promise
(function () {
    if (window.Promise) return;
    var pm = function (resolver) {
        var self = this, c;
        // check
        if (!(this instanceof pm))
            throw new Error('undefined is not a promise');
        if (typeof resolver !== 'function')
            throw new Error('Promise resolver ' + resolver + ' is not a function');
        // init
        c = this.__Promise = {
            status: 0, data: null, next: [], catched: false,
            done: function (data) { emit(self, data); },
            fail: function (err) { emit(self, err, true); }
        };
        if (resolver === noop) return this;
        // exec
        try { resolver(c.done, c.fail); }
        catch (err) { c.fail(err); }
        return this;
    };
    var proto = pm.prototype;
    function noop () { }
    function emit ($pm, data, isFail) {
        var c = $pm.__Promise, n;
        if (c.status !== 0) return;
        if (!isFail && (data instanceof pm))
            return data.then(c.done, c.fail);
        n = c.status = isFail ? 2 : 1;
        c.data = data;
        for (var i = 0, l = c.next.length; i < l; i++) {
            exec(c.next[i][0], c.next[i][n], c.data, isFail);
        }
        if (!isFail || c.catched) return;
        setTimeout(function () {
            if (c.catched) return;
            throw '(in promise) ' + data;
        });
    }
    function exec ($pm, fn, data, isFail) {
        if (typeof fn !== 'function') emit($pm, data, isFail);
        try { emit($pm, fn(data)); }
        catch (err) { emit($pm, err, true); }
    }
    pm.all = function (arr) {
        var $pm = new pm(noop), len = 1, rt = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] instanceof pm) {
                if (len < 0) arr[i].__Promise.catched = true;
                else {
                    len++;
                    (function () {
                        var n = i;
                        arr[n].then(
                            function (data) { rt[n] = data; if (!--len) emit($pm, rt); },
                            function (err) { emit($pm, err, true); len = -1; }
                        );
                    })();
                }
            }
            else if (len > 0) rt[i] = arr[i];
        }
        if (!--len) $pm.__Promise.done(rt);
        return $pm;
    };
    pm.race = function (arr) {
        var $pm = new pm(noop), isRt;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] instanceof pm) {
                if (isRt) arr[i].__Promise.catched = true;
                else {
                    arr[i].then(
                        function (data) { isRt = true; emit($pm, data); },
                        function (err) { isRt = true; emit($pm, err, true); }
                    )
                }
            }
            else if (!isRt) {
                isRt = true;
                emit($pm, arr[i]);
            }
        }
        return $pm;
    };
    pm.resolve = function (data) {
        var $pm = new pm(noop);
        emit($pm, data);
        return $pm;
    };
    pm.reject = function (err) {
        var $pm = new pm(noop);
        emit($pm, err, true);
        return $pm;
    };
    proto.then = function (done, fail) {
        var $pm = new pm(noop), c = this.__Promise, s = c.status;
        c.catched = true;
        if (s === 0) c.next.push([$pm, done, fail]);
        else if (s === 1) exec($pm, done, c.data);
        else exec($pm, fail, c.data, true);
        return $pm;
    };
    proto.catch = function (fail) {
        var $pm = new pm(noop), c = this.__Promise, s = c.status;
        c.catched = true;
        if (s === 0) c.next.push([$pm, null, fail]);
        else if (s === 1) emit($pm, c.data);
        else exec($pm, fail, c.data, true);
        return $pm;
    };
    window.Promise = pm;
})();
