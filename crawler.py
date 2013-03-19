#coding: utf-8

import requests
from pyquery import PyQuery as pq


class Parser(object):
    url = 'http://222.200.98.171:81/bookrankresult.aspx'
    ranktype = None
    maxcount = 200

    def __repr__(self):
        return '<Parser %d>' % (int(self.ranktype))

    def params(self, count, year, month, ranktype):
        def d(year, month):
            return '%s-%s-1' % (str(year), str(month))

        return {
            'maxcount': count,
            'd1': d(year, month),
            'd2': d(year, month),
            'cls': '',
            'queryfile': 1,
            'ranktypevalue': ranktype
        }

    def _get_text(self, index, element):
        return pq(element).text()

    def _parser_tr(self, tr):
        if not isinstance(tr, pq):
            tr = pq(tr)
        return [pq(td).text() for td in tr('td')]

    @property
    def head(self):
        h = self.table('thead tr').eq(0)
        return self._parser_tr(h)[0:]

    @property
    def body(self):
        b = self.table('tbody tr').each(self._get_text)
        return [self._parser_tr(tr) for tr in b]

    def query(self, year, month, count=maxcount):
        ret = requests.get(self.url, params=self.params(count, year, month,
                                                        self.ranktype))
        table = pq(ret.text)('table.tb')
        self.table = table if table.html() else None
        return table


class BooksParser(Parser):
    ranktype = 0

    @property
    def body(self):
        b, maps = super(BooksParser, self).body, {}

        b = map(lambda x: [int(x[1])] + x[1:], b)
        for row in b:
            if maps.get(row[3], None):
                maps[row[3]][1] = maps[row[3]][1] + row[1]
            else:
                maps[row[3]] = row
        return maps.values()


class StudentsParser(Parser):
    ranktype = 1

    @property
    def body(self):
        b = super(StudentsParser, self).body
        return map(lambda x: x[1:-1] + [int(x[-1])], b)


class FacultyParser(StudentsParser):
    ranktype = 2
