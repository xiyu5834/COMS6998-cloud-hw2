import os
import io
import codecs
import re
from setuptools import setup


def read(*names):
    with io.open(
        os.path.join(os.path.dirname(__file__), *names),
        encoding='utf-8'
    ) as f:
        return f.read()


def find_version(*file_paths):
    version_file = read(*file_paths)
    version_match = re.search(r"^__version__ = ['\"]([^'\"]*)['\"]",
                              version_file, re.M)
    if version_match:
        return version_match.group(1)
    raise RuntimeError('Unable to find version string.')


with codecs.open('README.rst', 'r', 'utf-8') as f:
    readme = f.read()
with codecs.open('HISTORY.rst', 'r', 'utf-8') as f:
    history = f.read()


version = find_version('requests_aws4auth', '__init__.py')


setup(
    name='requests-aws4auth',
    packages=['requests_aws4auth'],
    version=version,
    description='AWS4 authentication for Requests',
    long_description=readme + '\n\n' + history,
    author='Sam Washington',
    author_email='codegreen@aethris.net',
    url='https://github.com/sam-washington/requests-aws4auth',
    download_url=('https://github.com/sam-washington/'
                  'requests-aws4auth/tarball/' + version),
    license='MIT License',
    keywords='requests authentication amazon web services aws s3 REST',
    install_requires=['requests'],
    package_data={'requests_aws4auth': ['test/requests_aws4auth_test.py',
                                        '../README.rst', '../LICENSE',
                                        '../NOTICE', '../HISTORY.rst']},
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Natural Language :: English',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Topic :: Internet :: WWW/HTTP'])
