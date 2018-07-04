def sudoku2(grid):
    for idx0, row in enumerate(grid):
        newSet = set();
        #Check for same element in row
        for idx1, element1 in enumerate(row):
            if element1 != ".":
                if element1 in newSet:
                    return False;
                else:
                    newSet.add(element1)
                #Check for column, using idx1 since it will be the index where we found the element non '.'
                #we keep looking if we find in the rows, column an element in the idx1 equal to the one we found.
                for idx2, row in enumerate(grid):
                    if idx2 != idx0 and row[idx1] == element1:
                        return False;

    return checkValid3x3(grid);

#Auxiliary function finding if 3x3 squares are valid ones
def checkValid3x3(grid):
    rowCounter = 0;
    columnCounter = 0;

    for i in range(9):
        newSet = set();
        for j in range(rowCounter, rowCounter+3):
            for k in range(columnCounter, columnCounter+3):
                if grid[j][k] in newSet:
                    return False;
                else:
                    if grid[j][k] != ".":
                        newSet.add(grid[j][k]);
        columnCounter += 3;
        if columnCounter > 8:
            rowCounter += 3;
            columnCounter = 0;

    return True
