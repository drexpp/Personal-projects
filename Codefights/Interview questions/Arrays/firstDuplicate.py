arrayResults = {}
def firstDuplicate(a):
    for value in a:
        if value in arrayResults:
            return value
        arrayResults[value] = value

    return -1
