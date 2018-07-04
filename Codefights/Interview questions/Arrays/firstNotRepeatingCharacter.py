def firstNotRepeatingCharacter(s):
    order = []
    count = {}
    for character in s:
        if character in count:
            count[character] += 1
        else:
            count[character] = 1
            order.append(character)
    for value in order:
        if count[value] == 1:
            return value
    return '_'
