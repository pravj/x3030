#encoding: utf-8

#-----------------------------------------------
# Mapgen Iterative division
#-----------------------------------------------
# Extended from the version by Mau Magnaguagno
#-----------------------------------------------

require 'json'

module Mapgen
  extend self

  SOUTH = 1
  EAST = 2

  #-----------------------------------------------
  # Maze division
  #-----------------------------------------------

  def maze_division(width, height, room_size = 1, sleep_time = nil)
    raise 'Zero-sized dimension' if width.zero? or height.zero? or room_size.zero?
    grid = Array.new(height) {Array.new(width, 0)}
    parts = [0, 0, width, height]
    until parts.empty?
      x, y, width, height = parts.pop(4)
      next if width <= room_size or height <= room_size
      if sleep_time
        display_maze(grid)
        sleep(sleep_time)
      end
      if width != height ? width < height : rand(2).zero?
        h = rand(height - room_size)
        wy = y + h
        passage = x + rand(width)
        x.upto(x + width.pred) {|wx| grid[wy][wx] |= SOUTH if wx != passage}
        h += 1
        parts.push(x, y, width, h, x, wy.succ, width, height - h)
      else
        w = rand(width - room_size)
        wx = x + w
        passage = y + rand(height)
        y.upto(y + height.pred) {|wy| grid[wy][wx] |= EAST if wy != passage}
        w += 1
        parts.push(x, y, w, height, wx.succ, y, width - w, height)
      end
    end
    grid
  end

  #-----------------------------------------------
  # Display maze
  #-----------------------------------------------

  def display_maze(grid)
    grid_str = '_' * (grid.first.size << 1).succ
    height = grid.size.pred
    width = grid.first.size.pred
    grid.each_with_index {|row,y|
      grid_str << "\n|"
      bottom = y == height
      row.each_with_index {|cell,x|
        south = (cell & SOUTH != 0 || bottom)
        grid_str << (south ? '_' : ' ')
        grid_str << (cell >= EAST || x == width ? '|' : ((south && (row[x.succ] & SOUTH != 0 || bottom)) ? '_' : ' '))
      }
    }
  end

  #-----------------------------------------------
  # Wall to tile
  #-----------------------------------------------

  def wall_to_tile(grid, tile_clear = 0, tile_wall = 1)
    map = [Array.new((grid.first.size << 1).succ, tile_wall)]
    height = grid.size.pred
    width = grid.first.size.pred
    grid.each_with_index {|row,y|
      bottom = y == height
      walls = [tile_wall]
      ground = [tile_wall]
      row.each_with_index {|cell,x|
        south = (cell & SOUTH != 0 || bottom)
        if cell >= EAST or x == width
          walls.push(tile_clear, tile_wall)
          ground.push(south ? tile_wall : tile_clear, tile_wall)
        else
          walls.push(tile_clear, tile_clear)
          if south
            ground.push(tile_wall, tile_wall)
          else
            ground.push(tile_clear, tile_clear)
          end
        end
      }
      map.push(walls, ground)
    }
    map
  end
end

#-----------------------------------------------
# Main
#-----------------------------------------------
if $0 == __FILE__
  begin
    # Help
    if ARGV.first == '-h'
      puts "#$0 [width=10] [height=width] [room_size=1] [seed=rand(0xFFFFFFFF)] [sleep=0.02]"
    else
      maze_hash = Hash.new
      
      for index in (0...100)
        width = 24
        height = 6
        room_size = 1
        seed = rand(0xFFFFFFFF).to_i
        sleep = 0.02
        srand(seed)

        map = Mapgen.maze_division(width, height, room_size, sleep.zero? ? nil : sleep)
        map_tile = Mapgen.wall_to_tile(map, ' ', 'H')

        result = map_tile.map {|row| row.join}
        puts result

        maze = Array.new(2*height + 1) {Array.new(2*width + 1, 1)}

        result.each_with_index do |row_string, i|
          row_string.split('').each_with_index do |char, j|
            if (char == 'H')
              maze[i][j] = 0
            end
          end
        end

        maze_hash[index + 1] = maze
      end

      File.open('mazes.json', 'w') do |f|
        f.write(maze_hash.to_json)
      end
    end
  rescue
    puts $!, $@
    STDIN.gets
  end
end
