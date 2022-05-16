from .conn import DatabaseConnection


def main():
    print('INITIALIZING DB')
    with DatabaseConnection('./data.db') as cursor:
        cursor.execute('CREATE TABLE IF NOT EXISTS history (id integer primary key, monoxide_level string, detected_at datetime default current_timestamp)')
    print('DONE')


if __name__ == '__main__':
    main()