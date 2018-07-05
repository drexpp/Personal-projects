def isCryptSolution(crypt, solution):
    solutionArr = []
    firstWord = secondWord = thirdWord = ""
    for idx1, letter in enumerate(crypt):
        for idx,l in enumerate(letter):
            if idx1 == 0:
                firstWord += letterTranslated(l, solution)
            elif idx1 == 1:
                secondWord += letterTranslated(l, solution)
            else:
                thirdWord += letterTranslated(l, solution)
    if len(firstWord) == 1 and len(firstWord) == 1:
        if firstWord[:1] == "0" or secondWord[:1] == "0":
            return True
        else:
            return False
    else:
        if firstWord[:1] == "0" or secondWord[:1] == "0" or thirdWord[:1] == "0":
            return False
        else:
            return (int(firstWord) + int(secondWord)) == int(thirdWord)

def letterTranslated(l ,solution):
    for row in solution:
        if row[0] == l:
            return row[1]
