#coding: utf-8

import os
import json


DATA_PATH = os.path.abspath('data')


def name(type_, year, month):
    return os.path.join(DATA_PATH, '%d-%d-%d.json' % (type_, year, month))


def group(year, month):
    def _parse_faculty(f):
        def _(i):
            return {
                'name': i[0],
                'total': int(i[1]),
                'students': [],
            }

        return [(i[0], _(i)) for i in f['body']]

    def _parse_students(s):
        def _(i):
            return {
                'name': i[0],
                'faculty': i[1],
                'total': int(i[-1]),
            }
        return [_(i) for i in s['body']]

    def _group(f, s):
        f_dict = dict(f)
        f_dict['other'] = {
            'name': 'other',
            'total': 0,
            'students': [],
        }
        for i in s:
            key = i['faculty'] if i['faculty'] in f_dict.keys() else 'other'
            f_dict[key]['students'].append(i)
        f_dict['other']['total'] = sum([i['total'] for i in
                                       f_dict['other']['students']])

        return f_dict.values()

    faculty = json.loads(open(name(2, year, month), 'r').read())
    students = json.loads(open(name(1, year, month), 'r').read())

    if not faculty['body']:
        return None

    return _group(_parse_faculty(faculty), _parse_students(students))


def main():
    for year in xrange(2007, 2014):
        for month in xrange(1, 13):
            g = group(year, month)
            if g:
                with open(name(3, year, month), 'w') as f:
                    f.write(json.dumps(g))


if __name__ == '__main__':
    main()
